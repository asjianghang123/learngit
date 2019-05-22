import Cookies from 'js-cookie'

const TokenKey = 'gg_token'

export function getToken() {
  return Cookies.get(TokenKey)
  // return true
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  // return true
}

export function removeToken() {
  return Cookies.remove(TokenKey)
  // return true
}
