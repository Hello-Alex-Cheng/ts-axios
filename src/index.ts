// 入口文件
import { AxiosRequestConfig } from "./types"
import xhr from "./xhr";
import { bulidURL } from "./helpers/url";
import { transformRequest } from "./helpers/data";
import { processHeaders } from "./helpers/headers";

function axios (config: AxiosRequestConfig) {
	processConfig(config)
	xhr(config)
}

// 处理配置
function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  config.headers = transformHeaders(config)
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

export default axios
