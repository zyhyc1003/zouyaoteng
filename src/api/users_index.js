import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8080/api/mock'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么?获取token,传递
  // 1.获取token
  var token = localStorage.getItem('itcastpro_token')
  if (token) {
    // 2.在发送请求的时候传递token
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 实现登陆验证
export const login = (obj) => {
  // axios.post是一个promise对象
  //  .then返回的还是一个promise对象
  return axios.post('login', obj)
    .then((result) => {
      // then的回调函数中的返回值最终会返回到这个对象的then方法中
      return result.data
    })
}

// 获取用户数据
export const getUserList = (obj) => {
  return axios.get('users', { params: obj })
    .then((result) => {
      return result.data
    })
}

// 实现编辑用户提交
export const editUser = (obj) => {
  return axios.put(`users/${obj.id}`, obj)
    .then((result) => {
      return result.data
    })
}
// 实现用户数据的删除
export const delUserById = (id) => {
  return axios.delete(`users/${id}`)
    .then((result) => {
      return result.data
    })
}
// 实现用户状态除
export const updateUserStatuById = (id, type) => {
  return axios.put(`users/${id}/state/${type}`)
    .then((result) => {
      return result.data
    })
}
