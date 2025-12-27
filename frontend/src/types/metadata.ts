/**
 * 元数据相关类型定义
 */

/**
 * 字段数据类型
 */
export type FieldDataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'time'
  | 'email'
  | 'url'
  | 'text'
  | 'json'
  | 'enum'
  | 'relation'

/**
 * 验证规则类型
 */
export type ValidationRuleType =
  | 'required'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'email'
  | 'url'
  | 'custom'

/**
 * 验证规则
 */
export interface ValidationRule {
  type: ValidationRuleType
  value?: string | number
  message?: string
}

/**
 * 字段类型配置
 */
export interface FieldTypeConfig {
  type: FieldDataType
  validation?: ValidationRule[]
  defaultValue?: unknown
  enumValues?: string[]
}

/**
 * 页面展示配置
 */
export interface DisplayConfig {
  label: string
  placeholder?: string
  helpText?: string
  visible: boolean
  order?: number
  width?: string
  format?: string
}

/**
 * 字段编辑规则
 */
export interface EditRuleConfig {
  editable: boolean
  readonly?: boolean
  required?: boolean
  hidden?: boolean
  dependsOn?: string[]
  conditionalRules?: {
    field: string
    value: unknown
    then: Partial<EditRuleConfig>
  }[]
}

/**
 * 字段权限配置
 */
export interface FieldPermissionConfig {
  view: boolean
  edit: boolean
  create: boolean
  delete: boolean
  roles?: string[]
}

/**
 * 字段元数据
 */
export interface FieldMetadata {
  name: string
  type: FieldTypeConfig
  display: DisplayConfig
  editRule: EditRuleConfig
  permission: FieldPermissionConfig
  relation?: {
    model: string
    field: string
    type: 'oneToOne' | 'oneToMany' | 'manyToOne' | 'manyToMany'
  }
}

/**
 * 模型元数据
 */
export interface ModelMetadata {
  id: string
  name: string
  displayName: string
  description?: string
  fields: FieldMetadata[]
  permissions?: {
    view: boolean
    create: boolean
    update: boolean
    delete: boolean
    roles?: string[]
  }
  createdAt: string
  updatedAt?: string
}

