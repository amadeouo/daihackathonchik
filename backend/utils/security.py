import os

from datetime import datetime
from datetime import timedelta
from datetime import timezone
from typing import Optional

from dotenv import load_dotenv
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request
from fastapi import status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose import JWTError

from repositories.auth import AuthRepository
from repositories.user import UserRepository




load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=False)


async def get_token_from_cookie_or_header(request: Request, oauth2_token: Optional[str] = Depends(oauth2_scheme)) -> Optional[str]:
    """
    Получает токен из cookie или заголовка Authorization.
    Сначала проверяет cookie, затем заголовок (для обратной совместимости).
    """
    # Сначала проверяем cookie
    access_token = request.cookies.get("access_token")
    if access_token:
        return access_token
    
    # Если нет в cookie, проверяем заголовок Authorization
    if oauth2_token:
        return oauth2_token
    
    return None


def create_access_token(data: dict) -> str:
    """Создает JWT access токен."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt




async def get_current_user(request: Request, token: Optional[str] = Depends(get_token_from_cookie_or_header)):
    """Получает текущего пользователя на основе JWT токена из cookie или заголовка."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось подтвердить учетные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if not token:
        raise credentials_exception
    
    # Проверяем, не в черном списке ли токен
    if await AuthRepository.is_token_blacklisted(token):
        raise credentials_exception
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Проверяем тип токена
        if payload.get("type") != "access":
            raise credentials_exception
            
        user_id: str = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    user = await UserRepository.get_user_by_id(int(user_id))
    
    if user is None:
        raise credentials_exception
    
    return user




async def get_current_admin_user(current_user = Depends(get_current_user)):
    """Проверяет, является ли текущий пользователь администратором."""
    from models.user import UserRole
    
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав"
        )
    
    return current_user