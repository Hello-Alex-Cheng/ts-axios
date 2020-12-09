import axios from '../../src/index'
import qs from 'qs'

// axios.defaults.headers.common['test2'] = '123'
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '666'
//   }
// }).then(res => {
//   console.log('config res', res)
// })

// 测试 transformRequest 和 transformResponse 属性作用
axios({
  transformRequest: [
    function(data, headers) {
      headers.auth = 'you can set headers prop at here!!!'
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest)
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse),
    function(data) {
      // you can process response datas at here
      if (typeof data === 'object') {
        data.b = 2222222
        data.a += 1
      }
      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log('config res: ', res)
})

// 测试 create 方法
const instance = axios.create({
  transformRequest: [
    function(data, headers) {
      headers.auth = 'hello create function'
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest)
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse),
    function(data) {
      // you can process response datas at here
      if (typeof data === 'object') {
        data.b = 'create function data'
        data.a += 1
      }
      return data
    }
  ]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log('create funciton res: ', res)
})
