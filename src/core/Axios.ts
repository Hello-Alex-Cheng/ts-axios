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
	
	request(url: any, config?: AxiosRequestConfig): AxiosPromise {
		if (typeof url === 'string') {
			if (!config) {
				config = {}
			}
			config.url = url
		} else {
			// 如果url不是 string 类型，说明第一个参数可能就是 config
			// config = url 表示忽略第一个参数后面的所有参数
			config = url
		}

		// config! 表示 config 一定存在，消除报错
		return dispatchRequest(config!)
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