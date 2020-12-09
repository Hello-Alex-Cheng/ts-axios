import { AxiosRequestConfig } from "../types"
import { isPlainObject, deepMerge } from '../helpers/util'

// 策略 map
const strats = Object.create(null)

/**
 * @param config1 默认配置
 * @param config2 自定义配置
 */
export default function mergeConfig (config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
	if (!config2) {
		config2 = {}
	}

	const config = Object.create(null)
	
	/**
	 * @function 只接受自定义合并策略，对于`url/params/data`的合并策略如下
	 */
	const stratKeysFromVal2 = ['url', 'params', 'data']

	// 遍历自定义配置
	for (let key in config2) {
		mergeField(key)
	}

	for (let key in config1) {
		// 遍历默认配置，如果 config2 中不存在 key，就将默认配置合并到 config 中
		if (!config2[key]) {
			mergeField(key)
		}
	}

	stratKeysFromVal2.forEach(key => {
		// key 的值就是 fromVal2Strat
		strats[key] = fromVal2Strat
	})

	function mergeField (key: string): void {
		// 通过 key 找到所对应的合并策略函数
		// 如果策略对象中不含有 strats[key] 方法，就采用默认策略
		// strats[key] 中只会判断 config2 中的值: 如何 value 存在，就直接用 config2 中的值，否则啥也不干
		// defaultStrate: typeof val2 !== 'undefined' ? val2 : val1
		const strat = strats[key] || defaultStrate

		// 如何这里的 config1[key] | config2[key] 报错，那么就是没在 AxiosRequestConfig 中定义索引签名
		// warning: [ts] 元素隐式具有 "any" 类型，因为类型“AxiosRequestConfig”没有索引签名。
		// warning: [ts] 对象可能为“未定义”。config2![key] 表示我们这 config2 对象肯定存在
		config[key] = strat(config1[key], config2![key])
	}
	return config
}

function fromVal2Strat(val1: any, val2: any): any {
	if (typeof val2 !== 'undefined') return val2
}

/**
 * @function 默认合并策略，优先取`config2`中的值，因为`config2`是用户自定义的配置
 */
function defaultStrate (val1: any, val2: any): any {
	return typeof val2 !== 'undefined' ? val2 : val1
}

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

/**
 * @function deepMergeStrat 复杂对象合并策略
 * @desc 比如 'headers'
 */
function deepMergeStrat (val1: any, val2: any): any {
	if (isPlainObject(val2)) {
		// 深拷贝
		return deepMerge(val1, val2)
	} else if (typeof val2 !== 'undefined') {
		return val2
	} else if (isPlainObject(val1)) {
		return deepMerge(val1)
	} else if (typeof val1 !== 'undefined') {
		return val1
	}
}
