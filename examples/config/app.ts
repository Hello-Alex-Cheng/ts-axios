import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = '123'

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '666'
  }
}).then(res => {
  console.log('config res', res)
})