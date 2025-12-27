/**
 * 数据转换工具（基于 Schema）
 */

import { Schema, Effect } from 'effect'
import type { Schema as SchemaType } from 'effect/Schema'
import type { FieldMetadata, ModelMetadata } from '@/types/metadata'

/**
 * 将元数据字段类型转换为 Effect Schema
 */
export function metadataFieldToSchema(field: FieldMetadata): SchemaType<unknown> {
  const { type, validation } = field

  let schema: SchemaType<unknown>

  switch (type.type) {
    case 'string':
    case 'text':
    case 'email':
    case 'url':
      schema = Schema.String
      break
    case 'number':
      schema = Schema.Number
      break
    case 'boolean':
      schema = Schema.Boolean
      break
    case 'date':
    case 'datetime':
    case 'time':
      schema = Schema.String // 日期作为字符串处理
      break
    case 'json':
      schema = Schema.Unknown
      break
    case 'enum':
      if (type.enumValues) {
        schema = Schema.Literal(...type.enumValues)
      } else {
        schema = Schema.String
      }
      break
    default:
      schema = Schema.String
  }

  // 应用验证规则
  if (validation) {
    for (const rule of validation) {
      switch (rule.type) {
        case 'required':
          // Schema 默认就是必填的，如果需要可选，需要使用 Schema.optional
          break
        case 'minLength':
          if (typeof rule.value === 'number' && Schema.isString(schema)) {
            schema = schema.pipe(Schema.minLength(rule.value))
          }
          break
        case 'maxLength':
          if (typeof rule.value === 'number' && Schema.isString(schema)) {
            schema = schema.pipe(Schema.maxLength(rule.value))
          }
          break
        case 'min':
          if (typeof rule.value === 'number' && Schema.isNumber(schema)) {
            schema = schema.pipe(Schema.greaterThanOrEqualTo(rule.value))
          }
          break
        case 'max':
          if (typeof rule.value === 'number' && Schema.isNumber(schema)) {
            schema = schema.pipe(Schema.lessThanOrEqualTo(rule.value))
          }
          break
        case 'pattern':
          if (typeof rule.value === 'string' && Schema.isString(schema)) {
            schema = schema.pipe(Schema.pattern(new RegExp(rule.value)))
          }
          break
        case 'email':
          if (Schema.isString(schema)) {
            schema = schema.pipe(
              Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                message: () => rule.message || '邮箱格式不正确',
              })
            )
          }
          break
      }
    }
  }

  // 如果字段不是必填的，使用可选
  if (!field.editRule.required) {
    schema = Schema.optional(schema)
  }

  return schema
}

/**
 * 将模型元数据转换为 Effect Schema
 */
export function metadataToSchema(metadata: ModelMetadata): SchemaType<Record<string, unknown>> {
  const fields: Record<string, SchemaType<unknown>> = {}

  for (const field of metadata.fields) {
    fields[field.name] = metadataFieldToSchema(field)
  }

  return Schema.Struct(fields)
}

/**
 * 使用 Schema 验证数据
 */
export async function validateWithSchema<T>(
  schema: SchemaType<T>,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: Array<{ path: string[]; message: string }> }> {
  try {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        return yield* Schema.decodeUnknown(schema)(data)
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
}

