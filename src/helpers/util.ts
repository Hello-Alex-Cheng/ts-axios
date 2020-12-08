const toString = Object.prototype.toString

// 用户自定义的类型保护: 类型谓词
export function isDate(val: any): val is Date {
	return toString.call(val) === '[Object Date]'
}

export function isObject(val: any): val is Object {
	// typeof null === 'object'
	return val !== null && typeof val === 'object'
}

// 判断普通对象
export function isPlainObject(val: any): val is Object {
	return toString.call(val) === '[object Object]'
}

// 交叉类型，定义两个泛型 T & U
// 将 from 的属性都拷贝到 to 上
export function extend<T, U>(to: T, from: U): T & U {
	// for in 遍历对象除 Symbol 可枚举属性（包括原型属性）
	for (const key in from) {
		// 最终返回的 to 是 T & U 类型，所以这里需要将 to 断言成 T & U
		// 表达式开始是括号的情况加个 ;
		;(to as T & U)[key] = from[key] as any
	}

	return to as T & U
}

export function deepMerge(...objs: any[]): any {
	const result = Object.create(null)

	objs.forEach(obj => {
		if (obj) {
			Object.keys(obj).forEach(key => {
				const val = obj[key]

				if (isPlainObject(val)) {
					if (isPlainObject(result[key])) {
						result[key] = deepMerge(result[key], val)
					} else {
						result[key] = deepMerge({}, val)
					}
				} else {
					result[key] = val
				}
			})
		}
	})

	return result
}
