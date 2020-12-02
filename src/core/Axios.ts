import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from "./dispatchRequest";

export default class Axios {
	_requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
		// Object.assign 将所有可枚举属性的值从一个或多个源对象分配到目标对象。返回目标对象
		return this.request(
			Object.assign(config || {}, {
				method,
				url
			})
		)
	}

	_requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
		return this.request(
			Object.assign(config || {}, {
				method,
				url,
				data
			})
		)
	}
	
	request(config: AxiosRequestConfig): AxiosPromise {
		return dispatchRequest(config)
	}

	get(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData('get', url, config)
	}

	head(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData('head', url, config)
	}

	options(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData('options', url, config)
	}

	delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithoutData('delete', url, config)
	}

	post(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData('post', url, data, config)
	}

	put(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData('put', url, data, config)
	}

	patch(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
		return this._requestMethodWithData('patch', url, data, config)
	}
}