// `url` 为请求的地址，必选属性；而其余属性都是可选属性。`method` 是请求的 HTTP 方法；
// `data` 是 `post`、`patch` 等类型请求的数据，放到 `request body` 中的；
// `params` 是 `get`、`head` 等类型请求的数据，拼接到 `url` 的 `query string` 中的。
export interface AxiosRequestConfig {
	url?: string | undefined
	method?: Method
	data?: any
	params?: any
	headers?: any

	// lib.dom.d.ts 自定义字面量类型
	responseType?: XMLHttpRequestResponseType

	timeout?: number

	// transformRequest：允许在向服务器发送前，修改请求数据
	// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
	// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
	transformRequest?: AxiosTransformer | AxiosTransformer[]

	// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
	transformResponse?: AxiosTransformer | AxiosTransformer[]

	[propName: string]: any // 添加这个属性，主要是为了合并配置那里使用的
}

export interface AxiosTransformer {
	(data: any, headers?: any): any
}

export type Method = 'get' | 'GET'
	| 'delete' | 'Delete'
	| 'head' | 'HEAD'
	| 'options' | 'OPTIONS'
	| 'post' | 'POST'
	| 'put' | 'PUT'
	| 'patch' | 'PATCH'

// 响应数据接口类型
export interface AxiosResponse<T = any> {
	data: T
	status: number
	statusText: string
	headers: any // 响应头
	config: AxiosRequestConfig
	request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
	config: AxiosRequestConfig
	code?: string
	request?: any
	response?: any
	isAxiosError: boolean
}

// 定义混合类型的 Axios 接口，支持 axios.get | axios.post 这种方式去发请求
export interface Axios {
	interceptors: {
		request: AxiosInterceptorManager<AxiosRequestConfig>
		response?: AxiosInterceptorManager<AxiosResponse>
	}
	request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
	get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
	delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
	options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
	head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
	post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
	put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
	patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 混合类型接口 AxiosInstance
// 既有函数类型，又有执行方法
export interface AxiosInstance extends Axios {
	<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

	// 支持 axios(url, { method: * }) 方式
	<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 拦截器接口
// use 方法接受两个回调函数,一个 resolve,一个 reject
export interface AxiosInterceptorManager<T> {
	use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

	// 支持取消拦截器
	eject(id: number): void
}

export interface ResolvedFn<T = any> {
	(val: T): T | Promise<T>
}
export interface RejectedFn<T = any> {
	(error: any): any
}
