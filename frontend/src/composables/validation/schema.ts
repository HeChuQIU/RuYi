/**
 * Effect Schema 配置
 */

import { Schema } from 'effect'
import type { Schema as SchemaType } from 'effect/Schema'

/**
 * 创建字符串 Schema
 */
export function stringSchema(message?: string): SchemaType<string> {
  return Schema.String.pipe(
    Schema.message(() => message || '必须是字符串')
  )
}

/**
 * 创建数字 Schema
 */
export function numberSchema(message?: string): SchemaType<number> {
  return Schema.Number.pipe(
    Schema.message(() => message || '必须是数字')
  )
}

/**
 * 创建必填字段 Schema
 */
export function requiredSchema<T, A>(
  schema: SchemaType<T, A>,
  message?: string
): SchemaType<T, A> {
  return schema.pipe(
    Schema.message(() => message || '此字段为必填项')
  )
}

/**
 * 创建邮箱 Schema
 */
export function emailSchema(message?: string): SchemaType<string> {
  return Schema.String.pipe(
    Schema.pattern(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      { message: () => message || '邮箱格式不正确' }
    )
  )
}

/**
 * 创建最小长度 Schema
 */
export function minLengthSchema(
  min: number,
  message?: string
): <A extends string>(schema: SchemaType<A>) => SchemaType<A> {
  return (schema) =>
    schema.pipe(
      Schema.minLength(min, {
        message: () => message || `长度不能少于 ${min} 个字符`,
      })
    )
}

/**
 * 创建最大长度 Schema
 */
export function maxLengthSchema(
  max: number,
  message?: string
): <A extends string>(schema: SchemaType<A>) => SchemaType<A> {
  return (schema) =>
    schema.pipe(
      Schema.maxLength(max, {
        message: () => message || `长度不能超过 ${max} 个字符`,
      })
    )
}

/**
 * 创建范围 Schema（数字）
 */
export function rangeSchema(
  min: number,
  max: number,
  message?: string
): <A extends number>(schema: SchemaType<A>) => SchemaType<A> {
  return (schema) =>
    schema.pipe(
      Schema.between(min, max, {
        message: () => message || `值必须在 ${min} 和 ${max} 之间`,
      })
    )
}

