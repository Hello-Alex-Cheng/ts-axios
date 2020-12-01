import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error { 
	isAxiosError: boolean
	config: AxiosRequestConfig
	code?: string | null
	request?: any
	response?: AxiosResponse

	constructor(message: string, config: AxiosRequestConfig, code?: string | null, request?: any, response?: AxiosResponse) {
		super(message)
		this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
		
		// 使用了 `Object.setPrototypeOf(this, AxiosError.prototype)`
		// 这段代码的目的是为了解决 TypeScript 继承一些内置对象的时候的坑
		// [参考](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)。
		
		// 设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。
		// 这里表示，重新将 AxiosError的原型指向 AxiosError
		Object.setPrototypeOf(this, AxiosError.prototype)
	}
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
