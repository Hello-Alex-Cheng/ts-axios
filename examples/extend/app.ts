import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
