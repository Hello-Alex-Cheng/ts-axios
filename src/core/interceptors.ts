import { ResolvedFn, RejectedFn } from "../types"

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
	// interceptors 数组结构，保存含有 resolve 和 reject 属性的对象
	// 同时可以含有 null，是因为 eject 方法可以删除拦截器，
	private interceptors: Array<Interceptor<T> | null>

	constructor() {
		this.interceptors = []
	}
	// axios.interceptors.request.use(function (config) {
  //   return config;
  // }, function (error) {
  //   return Promise.reject(error)
	// })
	// 调用 请求 截器调用 use 方法，会收集所有的请求拦截器中的回调函数
	// 调用 响应拦 截器调用 use 方法，会收集所有的响应拦截器中的回调函数
	use(resolved: RejectedFn<T>, rejected?: RejectedFn): number {
		console.log('use count')
		this.interceptors.push({
			resolved,
			rejected
		})

		// 为什么要返回 number ?
		// 因为 axios 支持取消拦截器，取消的话，就需要找到拦截器对应的下标
		// const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
		// axios.interceptors.request.eject(myInterceptor);
		return this.interceptors.length - 1
	}

	// 拦截器内部使用,执行拦截器里面的方法
	forEach(fn: (interceptor: Interceptor<T>) => void): void {
		this.interceptors.forEach(interceptor => {
			if (interceptor !== null) {
				fn(interceptor)
			}
		})
	}

	// 取消拦截器
	eject(id: number): void {
		// 不能通过 splice 这种方法去删除，会改变数组长度，导致数组下标发生变化就乱了
		if (this.interceptors[id]) {
			this.interceptors[id] = null
		}
	}
}
