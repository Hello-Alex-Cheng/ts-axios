import { ResolvedFn, RejectedFn } from "../types"

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
	// 保存 resolve 和 reject 回调函数
	private interceptors: Array<Interceptor<T> | null>

	constructor() {
		this.interceptors = []
	}
	// axios.interceptors.request.use(function (config) {
  //   return config;
  // }, function (error) {
  //   return Promise.reject(error)
  // })
	use(resolved: RejectedFn<T>, rejected?: RejectedFn): number {
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

	forEach(fn: (interceptor: Interceptor<T>) => void): void {
		this.interceptors.forEach(interceptor => {
			if (interceptor !== null) {
				fn(interceptor)
			}
		})
	}

	// 取消拦截器
	eject(id: number): void {
		let interceptor = this.interceptors[id]
		if (interceptor) {
			interceptor = null
		}
	}
}
