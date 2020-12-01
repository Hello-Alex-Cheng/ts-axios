import axios from "../../src/index"

// error
axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {     
  console.log('打印错误:', e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log('打印: ', res)
}).catch((e) => {
  console.log(e.config)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e.config)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
  console.log(e.config)
})
