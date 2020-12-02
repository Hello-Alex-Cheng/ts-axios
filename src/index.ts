import { AxiosInstance } from "./types"

import Axios from "./core/Axios"

import { extend } from "./helpers/util";

function createInstance(): AxiosInstance {
  const context = new Axios()

  // 由于 request 内部使用到了 this, 所以需要将这个 this 指向绑定到 Axios 实例上
  // 确保调用时不会出现异常
  const instance = Axios.prototype.request.bind(context)
  
  // instance 就是 request 函数，内部调用 dispatchRequest 方法
  // dispatchRequest 内部返回了 xhr 方法，即发起请求的核心部分
  extend(instance, context)
  
  // 当ts无法正确推断出instance 的类型时，通过类型断言来处理
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
