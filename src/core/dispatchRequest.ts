// 入口文件
import xhr from "./xhr";
import { bulidURL } from "../helpers/url";
import { processHeaders, flattenHeaders } from "../helpers/headers";
import { transformRequest, transformResponse } from "../helpers/data";
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "../types"

export default function dispatchRequest (config: AxiosRequestConfig) {
  // 在发送请求之前，先对 config 作处理，包括 url, headers, data
  processConfig(config)

  // xhr 返回 Promise 实例，使我们可以通过 .then 方式来访问响应数据
	return xhr(config).then(res => {
    // transformResponseData 方法处理json字符串数据，
    // 如果数据是 json 字符串，就将其转为 json 对象
    return transformResponseData(res)
  })
}

// 处理配置
function processConfig (config: AxiosRequestConfig): void {
  // 处理url,对字符，null,undefined，以及各字段做拼接
  config.url = transformUrl(config)

  // 处理请求头，必须放在处理 data 前面,因为在处理 data 时，transformRequest已经将普通对象转化为字符串了
  config.headers = transformHeaders(config)

  // 对请求体做处理，如果data是普通对象，就将其转为json字符串类型
  config.data = transformRequestData(config)

  // 合并请求头
  config.headers = flattenHeaders(config.headers, config.method!)

  console.log('config.headers', config.headers)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  // url! 表示类型断言，它一定不为空
  return bulidURL(url!, params)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
