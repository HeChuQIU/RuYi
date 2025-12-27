/**
 * lodash-es 常用函数封装
 */

import {
  debounce,
  throttle,
  cloneDeep,
  isEqual,
  isEmpty,
  merge,
  pick,
  omit,
  get,
  set,
  unset,
} from 'lodash-es'

export { debounce, throttle, cloneDeep, isEqual, isEmpty, merge, pick, omit, get, set, unset }

/**
 * 深度克隆对象
 */
export const deepClone = cloneDeep

/**
 * 深度比较两个值是否相等
 */
export const deepEqual = isEqual

/**
 * 检查值是否为空
 */
export const isValueEmpty = isEmpty

/**
 * 从对象中提取指定字段
 */
export const pickFields = pick

/**
 * 从对象中排除指定字段
 */
export const omitFields = omit

/**
 * 安全获取嵌套对象属性
 */
export const safeGet = get

/**
 * 安全设置嵌套对象属性
 */
export const safeSet = set

/**
 * 安全删除嵌套对象属性
 */
export const safeUnset = unset

