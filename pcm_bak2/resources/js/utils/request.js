import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from './auth'
// var r = require('jsrsasign');

// 创建axios实例
const service = axios.create({
  baseURL: '',//'"http://gg.test"',//process.env.BASE_API, // api 的 base_url
  timeout: 150000, // 请求超时时间
  // withCredential: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    //   config.headers['X-CSRF-TOKEN'] = window.axios.defaults.headers.common['X-CSRF-TOKEN']//$('meta[name="csrf-token"]').attr('content')
    // console.log('CSRF'+$('meta[name="csrf-token"]').attr('content'));
    // window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content
    if (store.getters.token) {
      config.headers['Api-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['_token'] = window.axios.defaults.headers.common['X-CSRF-TOKEN']
      // config.headers['Authorization'] = 'Bearer '+getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // console.log(response.data);
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
     // console.log('response')
     // console.log(response)
    const res = response.data
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm(
    //       '你已被登出，可以取消继续留在该页面，或者重新登录',
    //       '确定登出',
    //       {
    //         confirmButtonText: '重新登录',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }
    //     ).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   // console.log('responsedata')
    //   // console.log(response.data);
    //   return response.data
    // }
    return res;
  },
  error => {
    // console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
