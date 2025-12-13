import os
from datetime import timedelta
from datetime import timezone

from dotenv import load_dotenv
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request
from fastapi import Response
from fastapi import status

from repositories.auth import AuthRepository
from repositories.user import UserRepository
from schemas.user import (
    ErrorResponse,
    ValidationErrorResponse,
    TelegramLoginRequest,
    TokenResponse,
    RefreshTokenRequest,
    UserResponse,
    UserWithTokenResponse
)
from utils.security import create_access_token
from utils.security import get_current_user
from utils.security import get_token_from_cookie_or_header

load_dotenv()
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv('REFRESH_TOKEN_EXPIRE_DAYS', 30))
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30))




router = APIRouter(
    prefix="/auth",
    tags=['Аутентификация']
)


def set_auth_cookies(response: Response, access_token: str, refresh_token: str):
    """Устанавливает access и refresh токены в httpOnly cookies."""
    # Получаем домен из переменных окружения (если задан)
    domain = os.getenv('COOKIE_DOMAIN', None)
    
    # Устанавливаем access token (короткоживущий)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=os.getenv('ENVIRONMENT') == 'production',  # secure только в production
        samesite="lax",  # защита от CSRF
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # в секундах
        path="/",
        domain=domain
    )
    
    # Устанавливаем refresh token (долгоживущий)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=os.getenv('ENVIRONMENT') == 'production',
        samesite="lax",
        max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,  # в секундах
        path="/",
        domain=domain
    )


def delete_auth_cookies(response: Response):
    """Удаляет access и refresh токены из cookies."""
    domain = os.getenv('COOKIE_DOMAIN', None)
    
    response.delete_cookie(
        key="access_token",
        path="/",
        domain=domain,
        samesite="lax"
    )
    
    response.delete_cookie(
        key="refresh_token",
        path="/",
        domain=domain,
        samesite="lax"
    )




@router.post(
    "/login",
    response_model=UserResponse,
    status_code=200,
    responses={
        400: {"model": ValidationErrorResponse, "description": "Ошибка аутентификации"},
        500: {"model": ErrorResponse}
    }
)
async def login_user(login_data: TelegramLoginRequest, response: Response):
    """
    Вход в систему через Telegram username.
    
    Если пользователь с таким Telegram username не существует, он будет создан.
    Устанавливает JWT токены (access и refresh) в httpOnly cookies.
    Возвращает информацию о пользователе.
    """
    # Ищем пользователя
    user = await UserRepository.get_user_by_telegram_username(login_data.telegram_username)
    
    if not user:
        # Создаем нового пользователя
        from schemas.user import UserCreate
        user_data = UserCreate(telegram_username=login_data.telegram_username)
        user = await UserRepository.create_user(user_data)
    
    # Создаем токены
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = await AuthRepository.create_refresh_token(user.id)
    
    # Устанавливаем токены в httpOnly cookies
    set_auth_cookies(response, access_token, refresh_token)
    
    return UserResponse.model_validate(user)




@router.post(
    "/refresh",
    response_model=dict,
    responses={
        400: {"model": ErrorResponse, "description": "Неверный refresh токен"},
        500: {"model": ErrorResponse}
    }
)
async def refresh_token(request: Request, response: Response, refresh_data: RefreshTokenRequest = None):
    """
    Обновление access токена с помощью refresh токена.
    
    Refresh токен может быть передан в теле запроса (для обратной совместимости)
    или автоматически берется из httpOnly cookie.
    Возвращает сообщение об успешном обновлении.
    """
    # Получаем refresh токен из cookie или из тела запроса
    refresh_token_value = request.cookies.get("refresh_token")
    
    if not refresh_token_value and refresh_data:
        refresh_token_value = refresh_data.refresh_token
    
    if not refresh_token_value:
        raise HTTPException(status_code=400, detail="Неверный refresh токен")
    
    user = await AuthRepository.get_user_by_refresh_token(refresh_token_value)
    
    if not user:
        raise HTTPException(status_code=400, detail="Неверный refresh токен")
    
    # Создаем новые токены
    new_access_token = create_access_token(data={"sub": str(user.id)})
    new_refresh_token = await AuthRepository.create_refresh_token(user.id)
    
    # Устанавливаем новые токены в httpOnly cookies
    set_auth_cookies(response, new_access_token, new_refresh_token)
    
    return {"success": True, "message": "Токены обновлены"}




@router.post(
    "/logout",
    response_model=dict,
    responses={
        401: {"model": ErrorResponse, "description": "Не авторизован"},
        500: {"model": ErrorResponse}
    }
)
async def logout(
    request: Request,
    response: Response,
    current_user = Depends(get_current_user),
    token: str = Depends(get_token_from_cookie_or_header)
):
    """
    Выход из системы.
    
    Токен добавляется в черный список.
    Refresh токен пользователя отзывается.
    Удаляет токены из cookies.
    Требует валидный access токен.
    """
    if token:
        await AuthRepository.add_to_blacklist(token)
    
    await AuthRepository.revoke_refresh_token(current_user.id)
    
    # Удаляем токены из cookies
    delete_auth_cookies(response)
    
    return {"success": True, "message": "Вы вышли из системы"}




@router.get(
    "/me",
    response_model=UserResponse,
    responses={
        401: {"model": ErrorResponse, "description": "Не авторизован"},
        500: {"model": ErrorResponse}
    }
)
async def get_current_user_info(current_user = Depends(get_current_user)):
    """
    Получение информации о текущем пользователе.
    
    Возвращает данные пользователя из базы данных.
    Требует валидный access токен.
    """
    return UserResponse.model_validate(current_user)