/**
 * 数据转换工具
 */

/**
 * 将对象转换为查询字符串
 */
export function objectToQueryString(obj: Record<string, unknown>): string {
  const params = new URLSearchParams()
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, String(item)))
      } else {
        params.append(key, String(value))
      }
    }
  })
  return params.toString()
}

/**
 * 将查询字符串转换为对象
 */
export function queryStringToObject(queryString: string): Record<string, string | string[]> {
  const params = new URLSearchParams(queryString)
  const result: Record<string, string | string[]> = {}
  params.forEach((value, key) => {
    if (result[key]) {
      const existing = result[key]
      if (Array.isArray(existing)) {
        existing.push(value)
      } else {
        result[key] = [existing, value]
      }
    } else {
      result[key] = value
    }
  })
  return result
}

/**
 * 将数组转换为树形结构
 */
export function arrayToTree<T extends { id: string; parentId?: string | null }>(
  items: T[],
  rootId: string | null = null
): Array<T & { children?: T[] }> {
  const map = new Map<string, T & { children?: T[] }>()
  const roots: Array<T & { children?: T[] }> = []

  items.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })

  items.forEach((item) => {
    const node = map.get(item.id)!
    if (item.parentId === rootId || !item.parentId) {
      roots.push(node)
    } else {
      const parent = map.get(item.parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
      }
    }
  })

  return roots
}

/**
 * 扁平化树形结构
 */
export function treeToArray<T extends { children?: T[] }>(
  tree: T[],
  childrenKey = 'children'
): T[] {
  const result: T[] = []
  const traverse = (nodes: T[]) => {
    nodes.forEach((node) => {
      const { [childrenKey]: children, ...rest } = node as T & { [key: string]: unknown }
      result.push(rest as T)
      if (children && Array.isArray(children)) {
        traverse(children as T[])
      }
    })
  }
  traverse(tree)
  return result
}

/**
 * 将对象数组转换为键值对映射
 */
export function arrayToMap<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T
): Map<string | number, T> {
  const map = new Map<string | number, T>()
  array.forEach((item) => {
    const keyValue = item[key]
    if (keyValue !== null && keyValue !== undefined) {
      map.set(String(keyValue), item)
    }
  })
  return map
}

/**
 * 将键值对映射转换为对象数组
 */
export function mapToArray<T>(map: Map<string | number, T>): T[] {
  return Array.from(map.values())
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target
  const source = sources.shift()
  if (!source) return target

  Object.keys(source).forEach((key) => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (
      typeof targetValue === 'object' &&
      targetValue !== null &&
      !Array.isArray(targetValue) &&
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      !Array.isArray(sourceValue)
    ) {
      target[key] = deepMerge(targetValue as Record<string, unknown>, sourceValue) as T[Extract<
        keyof T,
        string
      >]
    } else {
      target[key] = (sourceValue ?? targetValue) as T[Extract<keyof T, string>]
    }
  })

  return deepMerge(target, ...sources)
}

