import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "./types"
import { parseHeaders } from "./helpers/headers";
import { createError } from "./helpers/error";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
	return new Promise((resolve, reject) => {
		const { data = null, url, method = 'get', headers, responseType, timeout } = config
		const request = new XMLHttpRequest()

		if (responseType) { 
			request.responseType = responseType
		}

		if (timeout) {
			request.timeout = timeout
		}

		// 方法初始化一个请求, 第三个参数为 boolean，表示是否异步执行操作，默认为 true, 在send（）方法发送请求后会立即返回
		// 如果 async = false, send() 方法直到收到答复前不会返回
		// 如果multipart属性为true则这个必须为true，否则将引发异常。
		request.open(method.toUpperCase(), url, true)

		request.onreadystatechange = function handleLoad() {
			/**
			 * @name readyState=0(UNSENT) 代理被创建，但尚未调用 open() 方法
			 * @name readyState=1(OPENED) open() 方法已经被调用
			 * @name readyState=2(HEADERS_RECEIVED) send()方法已经被调用，并且头部和状态已经可获得
			 * @name readyState=3(LOADING) 下载中，responseText 属性已经包含部分数据
			 * @name readyState=4(DONE) 下载操作已完成
			 */
			if (request.readyState !== 4) return
			
			// 当发生网络错误或者超时错误时，status = 0
			if (request.status === 0) return

			// 返回所有的响应头，以 CRLF 分割的字符串，或者 null 如果没有收到任何响应
			const responseHeaders = parseHeaders(request.getAllResponseHeaders())
			const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
			const response: AxiosResponse = {
				data: responseData,
				status: request.status,
				statusText: request.statusText,
				headers: responseHeaders,
				config,
				request
			}
			// resolve(response)
			// 处理响应
			handleResponse(response)
		}

		// 处理网络异常错误
		request.onerror = function handleError() {
			reject(createError('Network error', config, null, request))
		}

		// 超时
		request.ontimeout = function handleTimeout() {
			reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'timeout', request))
		}

		Object.keys(headers).forEach(name => {
			if (data === null && name.toLowerCase() === 'content-type') {
				// 当我们传入的 `data` 为空的时候，请求 `header` 配置 `Content-Type` 是没有意义的，于是我们把它删除。
				delete headers[name]
			} else {
				// 设置请求头部的方法，必须在 open 和 send 方法之间调用
				// 如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头
				if (data === null && name.toLowerCase() === 'content-type') {
					// 如果 data 不存在，设置 Content-Type 就没有必要
					delete headers[name]
				} else {
					request.setRequestHeader(name, headers[name])
				}
			}
		})

		// 处理非 200 状态码
		function handleResponse(response: AxiosResponse): void {
			if (response.status >= 200 && response.status < 300) {
				resolve(response)
			} else {
				reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
			}
		}

		// 用于发送 HTTP 请求
		// 接受可选参数 data,作为请求主体
		// 如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。
		request.send(data)
	})
}
