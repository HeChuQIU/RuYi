/**
 * 日期处理工具（基于 dayjs）
 */

import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(customParseFormat)

export { dayjs, type Dayjs }

/**
 * 格式化日期
 */
export function formatDate(
  date: string | number | Date | Dayjs | null | undefined,
  format = 'YYYY-MM-DD'
): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 格式化日期时间
 */
export function formatDateTime(
  date: string | number | Date | Dayjs | null | undefined,
  format = 'YYYY-MM-DD HH:mm:ss'
): string {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 获取相对时间（如：2小时前）
 */
export function getRelativeTime(date: string | number | Date | Dayjs | null | undefined): string {
  if (!date) return ''
  return dayjs(date).fromNow()
}

/**
 * 检查日期是否有效
 */
export function isValidDate(date: unknown): boolean {
  if (!date) return false
  return dayjs(date).isValid()
}

/**
 * 获取两个日期之间的差值（天数）
 */
export function diffDays(
  date1: string | number | Date | Dayjs,
  date2: string | number | Date | Dayjs
): number {
  return dayjs(date1).diff(dayjs(date2), 'day')
}

/**
 * 获取当前时间戳（毫秒）
 */
export function getCurrentTimestamp(): number {
  return dayjs().valueOf()
}

/**
 * 获取当前日期字符串
 */
export function getCurrentDate(format = 'YYYY-MM-DD'): string {
  return dayjs().format(format)
}

/**
 * 获取当前日期时间字符串
 */
export function getCurrentDateTime(format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs().format(format)
}

