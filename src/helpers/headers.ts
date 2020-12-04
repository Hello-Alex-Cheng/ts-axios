import { isPlainObject } from "./util"

function normalizeHeaderName(headers: any, normalizedName: string): void {
	if (!headers) return

	Object.keys(headers).forEach(name => {
		if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
			headers[normalizedName] = headers[name]
			delete headers[name]
		}
	})
}

export function processHeaders(headers: any, data: any): any {
	// 1. normalizeHeader：将请求头字段规范化，防止用户输入没区分大小写这种
  // 2. 如果请求体是普通对象，并且没有传入headers.Content-Type,还需要默认加上 Content-Type
	normalizeHeaderName(headers, 'Content-Type')

	if (isPlainObject(data)) {
		// data 为普通对象，如果在请求时没有加上请求头，需要自动加上Content-Type
		if (headers && !headers['Content-Type']) {
			headers['Content-Type'] = 'application/json;charset=utf-8'
		}
	}

	return headers
}

// 通过 `XMLHttpRequest` 对象的 `getAllResponseHeaders` 方法获取到的值是字符串
// 每一行都是以回车符和换行符 `\r\n` 结束，它们是每个 `header` 属性的分隔符
// 解析 headers 工具函数
export function parseHeaders(headers: string): any {
	// Object.create(null) 创建出一个纯净的对象，不含有 Prototype Object
	let parsed = Object.create(null)
	if (!headers) return parsed

	headers.split('\r\n').forEach(line => {
		let [key, val] = line.split(':')
		key = key.trim().toLowerCase()
		if (!key) return

		if (val) {
			val = val.trim()
		}
		parsed[key] = val
	})

	return parsed
}
