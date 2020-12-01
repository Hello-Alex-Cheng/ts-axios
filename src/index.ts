// 入口文件
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "./types"
import xhr from "./xhr";
import { bulidURL } from "./helpers/url";
import { transformRequest, transformResponse } from "./helpers/data";
import { processHeaders } from "./helpers/headers";

function axios (config: AxiosRequestConfig) {
  // 在调用之前，先对 config 作处理，包括 url, headers, data
  processConfig(config)

  // xhr 返回 Promise 类型，使我们可以通过 .then 方式来访问响应数据
	return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理配置
function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)

  // 处理 headers 必须放在处理 data 前面,因为在处理 data 时，transformRequest已经将普通对象转化为字符串了
  config.headers = transformHeaders(config)

  config.data = transformRequestData(config)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
