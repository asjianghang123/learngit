import request from '../utils/request'
//前端第一次加密
let CryptoJS = require("crypto-js");
export function login(username, password, captcha, key) {
  let pwd = JSON.stringify({password:password}),
      k = CryptoJS.enc.Latin1.parse(env.KEY),
      iv = CryptoJS.enc.Latin1.parse(env.IV),
      encrypted = CryptoJS.AES.encrypt(pwd, k, {
        iv: iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.ZeroPadding
      }).toString();
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      email:username,
      password: encrypted,//CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64),
      captcha: captcha,
      // check: undefined,
      // _token: '4t6bDllJVT6SOvDBvuPaZUn9Jy47ZIDj3zYNbkPV'
      key: key
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user',
    method: 'get',
    params: { api_token:token }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}
