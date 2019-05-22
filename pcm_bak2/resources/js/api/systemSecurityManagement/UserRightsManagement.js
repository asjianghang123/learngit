import request from '@/utils/request'

let CryptoJS = require("crypto-js");
export function getUsers() {
  return request({
    url: '/getUsers',
    method: 'get'
  })
  // return axios.post("getUsers")
  // .then(function(response){
  //   // console.log(response)
  //     return response;
  // })
  // .catch()
}

export function deleteUsers(usersId) {
  return request({
    url: '/deleteUsers',
    method: 'get',
    params: {
      usersId: usersId
    }
  })
}

export function addUser(form) {
  return request({
    url: '/addUser',
    method: 'get',
    params: {
      city: form.city,
      contactPhone: form.contactPhone,
      county: form.county,
      department: form.department,
      email: form.email,
      idCard: form.idCard,
      name: form.name,
      password: form.password,
      passwordValidDays: form.passwordValidDays,
      role: form.role,
      unit: form.unit,
      userClassification: form.userClassification,
      username: form.username
    }
  })
}

export function switchUseStatus(email, useStatus) {
  return request({
    url: '/switchUseStatus',
    method: 'get',
    params: {
      email: email,
      useStatus: useStatus
    }
  })
}

export function resetPwd(email) {
  var password = JSON.stringify({password:env.defaultPassword});
  var key = CryptoJS.enc.Latin1.parse(env.KEY);
  var iv = CryptoJS.enc.Latin1.parse(env.IV);
  var encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.ZeroPadding
  }).toString();
  // console.log(encrypted)

  return request({
    url: '/resetPwd',
    method: 'get',
    params: {
      email: email,
      password: encrypted//CryptoJS.SHA256('Password!2#4').toString(CryptoJS.enc.Base64),
    }
  });
}
// export default {
//   getUsersData: function(){
//     return request({
//       url: '/getUsers',
//       method: 'get'
//     })
//     // return axios.post("getUsers")
//     // .then(function(response){
//     //   // console.log(response)
//     //     return response;
//     // })
//     // .catch()
//   }
// }