// `url` 为请求的地址，必选属性；而其余属性都是可选属性。`method` 是请求的 HTTP 方法；
// `data` 是 `post`、`patch` 等类型请求的数据，放到 `request body` 中的；
// `params` 是 `get`、`head` 等类型请求的数据，拼接到 `url` 的 `query string` 中的。
export interface AxiosRequestConfig {
	url?: string | undefined
	method?: Method
	data?: any
	params?: any
	headers?: any
	responseType?: XMLHttpRequestResponseType // lib.dom.d.ts 自定义字面量类型
	timeout?: number
}

export type Method = 'get' | 'GET'
	| 'delete' | 'Delete'
	| 'head' | 'HEAD'
	| 'options' | 'OPTIONS'
	| 'post' | 'POST'
	| 'put' | 'PUT'
	| 'patch' | 'PATCH'

// 响应数据接口类型
export interface AxiosResponse {
	data: any
	status: number
	statusText: string
	headers: any // 响应头
	config: AxiosRequestConfig
	request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
	config: AxiosRequestConfig
	code?: string
	request?: any
	response?: any
	isAxiosError: boolean
}

// 定义混合类型的 Axios 接口，支持 axios.get | axios.post 这种方式去发请求
export interface Axios {
	request(config: AxiosRequestConfig): AxiosPromise
	get(url: string, config?: AxiosRequestConfig): AxiosPromise
	delete(url: string, config?: AxiosRequestConfig): AxiosPromise
	options(url: string, config?: AxiosRequestConfig): AxiosPromise
	head(url: string, config?: AxiosRequestConfig): AxiosPromise
	post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
	put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
	patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

// 混合类型接口 AxiosInstance
// 既有函数类型，又有执行方法
export interface AxiosInstance extends Axios{
	(config: AxiosRequestConfig): AxiosPromise
}
