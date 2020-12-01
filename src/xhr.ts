import { AxiosRequestConfig } from "./types"

export default function xhr(config: AxiosRequestConfig) {
	const { data = null, url, method = 'get', headers } = config
	const request = new XMLHttpRequest()

  // 方法初始化一个请求, 第三个参数为 boolean，表示是否异步执行操作，默认为 true, 在send（）方法发送请求后会立即返回
  // 如果 async = false, send() 方法直到收到答复前不会返回
  // 如果multipart属性为true则这个必须为true，否则将引发异常。
	request.open(method.toUpperCase(), url, true)

	Object.keys(headers).forEach(name => {
		if (data === null && name.toLowerCase() === 'content-type') {
			// 当我们传入的 `data` 为空的时候，请求 `header` 配置 `Content-Type` 是没有意义的，于是我们把它删除。
			delete headers[name]
		} else {
			// 设置请求头部的方法，必须在 open 和 send 方法之间调用
      // 如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头
			request.setRequestHeader(name, headers[name])
		}
	})

	// 用于发送 HTTP 请求
  // 接受可选参数 data,作为请求主体
  // 如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null。
	request.send(data)
}
