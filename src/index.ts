import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "./types"

import Axios from "./core/Axios"

import { extend } from "./helpers/util"
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

// AxiosStatic 接口继承自 `AxiosInstance`
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  // Axios 原型上最核心的方法就是 request 方法
  // 其它比如 get/post/delete 等等这些方法体内都是调用了 request 方法
  const context = new Axios(config)

  // 由于 request 内部使用到了 this, 所以需要将这个 this 指向绑定到 Axios 实例上，确保调用时不会出现异常
  // bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
  // instance 是 bind 函数返回的新函数，内部调用 dispatchRequest 方法，dispatchRequest 内部返回了 xhr 方法，即发起请求的核心部分
  const instance = Axios.prototype.request.bind(context)
  
  // extend 工具方法，将 Axios 构造函数的所有属性及原型上的方法复制给 instance 方法
  // 通过 for...in 赋值
  extend(instance, context)
  
  // 当ts无法正确推断出instance 的类型时，通过类型断言来处理
  return instance as AxiosStatic
}

// 我们拿到的其实就是 request 混合方法
const axios = createInstance(defaults)

// 提供对外的 create 静态方法，
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
