import axios from '../../src/index'

axios({
  method: 'get',
  url: '/extend/get',
  params: {
    a: 1,
    b: 2
  }
})
axios.request({
  method: 'get',
  url: '/extend/get',
  params: {
    a: 'request'
  }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.head('/extend/head')
axios.delete('/extend/delete')

axios.post('/extend/post', { msg: 'poost' })
axios.put('/extend/put', { msg: 'put' })
