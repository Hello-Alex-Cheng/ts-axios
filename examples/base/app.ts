import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// URLSearchParams 构造函数定义了一些使用的方法来处理 URL 的查询字符串
// const searchParams = new URLSearchParams(paramsString)

// 注意: 这里的Content-Type是: application/x-www-form-urlencoded;charset=UTF-8 (form-data)
// 当浏览器发现我们传入的参数是 'URLSearchParams' 类型的参数时，它会自动给请求 header 加上合适的Content-Type
// XMLHttpRequest对象的实例的 send 方法本身是支持我们传入 URLSearchParams 这样的类型参数的

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// promise
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  // 我们没有指定 responseType。res.data 是 json 字符串类型
  // 所以需要一个工具函数 transformResponseData 来处理 response data
  console.log('响应1:', res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1111,
    b: 2222
  }
}).then(res => {
  // 指定了 responseType，res.data 是 json对象类型
  console.log('响应2:', res)
})
