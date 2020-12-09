import { processHeaders } from "./helpers/headers";
import { transformRequest, transformResponse } from "./helpers/data";

import { AxiosRequestConfig } from "./types/index";

const defaults: AxiosRequestConfig = {
	method: 'get',
	timeout: 0,
	headers: {
		// common 表示任何请求都要添加该属性
		common: {
			Accept: 'application/json, text/plain, */*'
		}
	},

	transformRequest: [
		function (data: any, headers: any): any {
			processHeaders(headers, data)
			return transformRequest(data)
		} 
	],
	transformResponse: [
		function (data: any): any {
			return transformResponse(data)
		}
	]
}

const methodsNoData = ['get', 'delete', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']

methodsNoData.forEach(method => {
	defaults.headers[method] = {}
})

methodsWithData.forEach(method => {
	defaults.headers[method] = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

export default defaults
