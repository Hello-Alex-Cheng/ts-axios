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
	normalizeHeaderName(headers, 'Content-Type')

	if (isPlainObject(data)) {
		// data 为普通对象，如果在请求时没有加上请求头，需要自动加上Content-Type
		if (headers && !headers['Content-Type']) {
			headers['Content-Type'] = 'application/json;charset=utf-8'
		}
	}

	return headers
}
