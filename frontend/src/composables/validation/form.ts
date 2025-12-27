/**
 * 表单验证 composable
 */

import { ref, type Ref } from 'vue'
import { Schema, Effect } from 'effect'
import type { Schema as SchemaType } from 'effect/Schema'

/**
 * 表单验证错误
 */
export interface FormValidationError {
  field: string
  message: string
}

/**
 * 表单验证状态
 */
export interface FormValidationState<T> {
  data: Ref<T>
  errors: Ref<FormValidationError[]>
  isValid: Ref<boolean>
  isDirty: Ref<boolean>
  validate: () => Promise<boolean>
  validateField: (field: keyof T) => Promise<boolean>
  reset: () => void
  resetField: (field: keyof T) => void
}

/**
 * 创建表单验证 composable
 */
export function useFormValidation<T extends Record<string, unknown>>(
  schema: SchemaType<T>,
  initialData: T
): FormValidationState<T> {
  const data = ref<T>({ ...initialData }) as Ref<T>
  const errors = ref<FormValidationError[]>([])
  const isValid = ref(false)
  const isDirty = ref(false)
  const initialValues = { ...initialData }

  /**
   * 验证整个表单
   */
  const validate = async (): Promise<boolean> => {
    try {
      const result = await Effect.runPromise(
        Effect.gen(function* () {
          return yield* Schema.decodeUnknown(schema)(data.value)
        })
      )
      data.value = result
      errors.value = []
      isValid.value = true
      return true
    } catch (error) {
      const schemaError = error as { errors?: Array<{ path: string[]; message: string }> }
      if (schemaError.errors) {
        errors.value = schemaError.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }))
      } else {
        errors.value = [
          {
            field: '',
            message: '验证失败',
          },
        ]
      }
      isValid.value = false
      return false
    }
  }

  /**
   * 验证单个字段
   */
  const validateField = async (field: keyof T): Promise<boolean> => {
    const fieldSchema = Schema.struct({ [field as string]: (schema as any).fields[field] })
    try {
      await Effect.runPromise(
        Effect.gen(function* () {
          return yield* Schema.decodeUnknown(fieldSchema)({ [field]: data.value[field] })
        })
      )
      errors.value = errors.value.filter((err) => err.field !== String(field))
      if (errors.value.length === 0) {
        isValid.value = true
      }
      return true
    } catch (error) {
      const schemaError = error as { errors?: Array<{ path: string[]; message: string }> }
      if (schemaError.errors) {
        const fieldErrors = schemaError.errors
          .filter((err) => err.path[0] === String(field))
          .map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        errors.value = [
          ...errors.value.filter((err) => err.field !== String(field)),
          ...fieldErrors,
        ]
      }
      isValid.value = false
      return false
    }
  }

  /**
   * 重置表单
   */
  const reset = () => {
    data.value = { ...initialValues } as T
    errors.value = []
    isValid.value = false
    isDirty.value = false
  }

  /**
   * 重置单个字段
   */
  const resetField = (field: keyof T) => {
    data.value[field] = initialValues[field] as T[Extract<keyof T, string>]
    errors.value = errors.value.filter((err) => err.field !== String(field))
  }

  return {
    data,
    errors,
    isValid,
    isDirty,
    validate,
    validateField,
    reset,
    resetField,
  }
}

