import { isPlainObject } from "./util"

// 我们通过执行 `XMLHttpRequest` 对象实例的 `send` 方法来发送请求，并通过该方法的参数设置请求 `body` 数据

// `send` 方法的参数支持 `Document` 和 `BodyInit` 类型

// `BodyInit` 包括了 `Blob`, `BufferSource`, `FormData`, `URLSearchParams`, `ReadableStream`、`USVString`，当没有数据的时候，我们还可以传入 `null`。
export function transformRequest (data: any): any {
	if (isPlainObject(data)) {
		return JSON.stringify(data)
	}
	return data
}

export function transformResponse(data: any): any {
	if (typeof data === 'string') {
		try {
			data =  JSON.parse(data)
		} catch (error) {
			// ..
		}
	}
	return data
}
