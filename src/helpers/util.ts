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
