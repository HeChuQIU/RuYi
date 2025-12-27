/**
 * 验证工具
 */

/**
 * 验证邮箱格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证 URL 格式
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证手机号格式（中国大陆）
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证身份证号格式（中国大陆）
 */
export function isValidIdCard(idCard: string): boolean {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

/**
 * 验证是否为空字符串
 */
export function isEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length === 0
}

/**
 * 验证是否为数字
 */
export function isNumeric(value: unknown): boolean {
  if (typeof value === 'number') return !isNaN(value)
  if (typeof value === 'string') {
    return !isNaN(Number(value)) && value.trim() !== ''
  }
  return false
}

/**
 * 验证字符串长度
 */
export function validateLength(
  value: string,
  min?: number,
  max?: number
): { valid: boolean; message?: string } {
  const length = value.length
  if (min !== undefined && length < min) {
    return { valid: false, message: `长度不能少于 ${min} 个字符` }
  }
  if (max !== undefined && length > max) {
    return { valid: false, message: `长度不能超过 ${max} 个字符` }
  }
  return { valid: true }
}

/**
 * 验证数字范围
 */
export function validateRange(
  value: number,
  min?: number,
  max?: number
): { valid: boolean; message?: string } {
  if (min !== undefined && value < min) {
    return { valid: false, message: `值不能小于 ${min}` }
  }
  if (max !== undefined && value > max) {
    return { valid: false, message: `值不能大于 ${max}` }
  }
  return { valid: true }
}

/**
 * 验证必填字段
 */
export function validateRequired(value: unknown): { valid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { valid: false, message: '此字段为必填项' }
  }
  if (typeof value === 'string' && value.trim().length === 0) {
    return { valid: false, message: '此字段为必填项' }
  }
  return { valid: true }
}

/**
 * 验证正则表达式
 */
export function validatePattern(
  value: string,
  pattern: RegExp,
  message?: string
): { valid: boolean; message?: string } {
  if (!pattern.test(value)) {
    return { valid: false, message: message || '格式不正确' }
  }
  return { valid: true }
}

