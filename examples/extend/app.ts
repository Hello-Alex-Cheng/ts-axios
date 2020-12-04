import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/extend/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })
// axios.request({
//   method: 'get',
//   url: '/extend/get',
//   params: {
//     a: 'request'
//   }
// })

// axios.get('/extend/get')
// axios.options('/extend/options')
// axios.head('/extend/head')
// axios.delete('/extend/delete')

// axios.post('/extend/post', { msg: 'poost' })
// axios.put('/extend/put', { msg: 'put' })

// axios({
//   method: 'get',
//   url: '/extend/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })

// 支持第一个参数为 url
// axios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'axios(url, config) request'
//   }
// })


interface ResponseData<T = any> {
	code: number
	// @type { T }
	result: T
	message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/post', {
    method: 'post',
    data: {
      msg: 'axios(url, config) request'
    }
  })
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log('打印user:', user)
  }
}

test()