import {
	AxiosRequestConfig,
	AxiosPromise,
	Method,
	AxiosResponse,
	ResolvedFn,
	RejectedFn
} from '../types'
import dispatchRequest from "./dispatchRequest"
import InterceptorManager from './interceptors'

interface Interceptors {
	request: InterceptorManager<AxiosRequestConfig>
	response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
	resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
	rejected?: RejectedFn
}

export default class Axios {
	interceptors: Interceptors

	constructor() {
		this.interceptors = {
			request: new InterceptorManager<AxiosRequestConfig>(),
			response: new InterceptorManager<AxiosResponse>()
		}
	}
	
	request(url: any, config?: any): AxiosPromise {
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

		// 配置拦截器
		const chain: PromiseChain[] = [{
			resolved: dispatchRequest,
			rejected: undefined
		}]

		this.interceptors.request.forEach(interceptor => {
			// unshift() 将一个或多个元素添加到数组的开头，返回数组的长度（修改原数组）
			chain.unshift(interceptor)
		})
		this.interceptors.response.forEach(interceptor => {
			chain.push(interceptor)
		})

		// promise 实例，通过 .then 直接可以获取到 config 的值
		let promise = Promise.resolve(config)

		while (chain.length) {
			// shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
			const { resolved, rejected } = chain.shift()!
			promise = promise.then(resolved, rejected)
		}

		return promise
		// ! 非空断言操作符, config! 表示 config 一定存在，消除报错
		// return dispatchRequest(config!)
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
}