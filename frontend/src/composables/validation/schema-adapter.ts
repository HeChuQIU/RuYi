/**
 * Effect Schema 到 Standard Schema 适配器
 * 
 * 用于将 Effect Schema 转换为 Standard Schema，以便与 Nuxt UI 的 UForm 组件集成
 */

import { Schema, Effect } from 'effect'
import type { Schema as SchemaType } from 'effect/Schema'

/**
 * Standard Schema 接口
 * 参考：https://github.com/standard-schema/standard-schema
 */
export interface StandardSchema {
  _output?: unknown
  _input?: unknown
  _error?: unknown
  parse: (input: unknown) => { success: boolean; data?: unknown; errors?: Array<{ path: string[]; message: string }> }
  safeParse: (input: unknown) => { success: boolean; data?: unknown; errors?: Array<{ path: string[]; message: string }> }
}

/**
 * 将 Effect Schema 转换为 Standard Schema
 * 
 * 注意：Effect Schema 可能已经实现了 Standard Schema 接口
 * 这里提供一个包装器以确保兼容性
 */
export function effectSchemaToStandardSchema<T, A>(
  schema: SchemaType<T, A>
): StandardSchema {
  return {
    _output: undefined,
    _input: undefined,
    _error: undefined,
    parse: (input: unknown) => {
      try {
        // 使用同步方式运行，如果失败会抛出错误
        const result = Effect.runSync(
          Effect.gen(function* () {
            return yield* Schema.decodeUnknown(schema)(input)
          })
        )
        return { success: true, data: result }
      } catch (error) {
        const schemaError = error as { errors?: Array<{ path: string[]; message: string }> }
        return {
          success: false,
          errors: schemaError.errors || [{ path: [], message: '验证失败' }],
        }
      }
    },
    safeParse: async (input: unknown) => {
      try {
        // 使用异步方式运行，更安全
        const result = await Effect.runPromise(
          Effect.gen(function* () {
            return yield* Schema.decodeUnknown(schema)(input)
          })
        )
        return { success: true, data: result }
      } catch (error) {
        const schemaError = error as { errors?: Array<{ path: string[]; message: string }> }
        return {
          success: false,
          errors: schemaError.errors || [{ path: [], message: '验证失败' }],
        }
      }
    },
  }
}

/**
 * 检查 Effect Schema 是否已经实现了 Standard Schema 接口
 */
export function isStandardSchema(schema: unknown): schema is StandardSchema {
  return (
    typeof schema === 'object' &&
    schema !== null &&
    'parse' in schema &&
    typeof (schema as StandardSchema).parse === 'function' &&
    'safeParse' in schema &&
    typeof (schema as StandardSchema).safeParse === 'function'
  )
}

/**
 * 获取可用于 UForm 的 Schema
 * 如果已经是 Standard Schema，直接返回；否则转换
 */
export function getFormSchema<T, A>(schema: SchemaType<T, A> | StandardSchema): StandardSchema {
  if (isStandardSchema(schema)) {
    return schema
  }
  return effectSchemaToStandardSchema(schema)
}
