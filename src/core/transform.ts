import { AxiosTransformer } from "../types";

/**
 * @param data 可以是请求体，也可以是响应数据
 * @param headers 可以是请求头，也可以是响应头
 * @param fns fns包含默认的 transformRequest/transformResponse 以及用户定义的 transformRequest/transformResponse
 */
export default function transform(
	data: any,
	headers: any,
	fns?: AxiosTransformer | AxiosTransformer[]
) {
	if (!fns) {
		return data
	}

	if (!Array.isArray(fns)) {
		fns = [fns]
	}

	fns.forEach(fn => {
		// 调用处理方法
		data = fn(data, headers)
	})

	return data
}
