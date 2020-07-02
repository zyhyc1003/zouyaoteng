//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
Mock.mock('http://localhost:8080/api/mock', {
    "ret":0,
    "data":
      {
        "mtime": "@datetime",//随机生成日期时间
        "score|1-800": 800,//随机生成1-800的数字
        "rank|1-100":  100,//随机生成1-100的数字
        "stars|1-5": 5,//随机生成1-5的数字
        "nickname": "@cname",//随机生成中文名字
      }
//data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
});

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
    return axios.delete(`users/${obj.id}`)
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
