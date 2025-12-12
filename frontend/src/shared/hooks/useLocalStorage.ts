export const useLocalStorage = () => {
  function getToken() {
    return localStorage.getItem('token')
  }

  function setToken(token: string) {
    localStorage.setItem('token', token)
  }

  function removeToken() {
    localStorage.removeItem('token')
  }


  return {
    getToken,
    setToken,
    removeToken,
  }
}