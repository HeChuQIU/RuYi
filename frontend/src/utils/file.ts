/**
 * 文件处理工具
 */

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * 获取文件扩展名
 */
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  if (lastDot === -1) return ''
  return filename.slice(lastDot + 1).toLowerCase()
}

/**
 * 获取文件名（不含扩展名）
 */
export function getFileNameWithoutExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  if (lastDot === -1) return filename
  return filename.slice(0, lastDot)
}

/**
 * 检查文件类型
 */
export function checkFileType(filename: string, allowedTypes: string[]): boolean {
  const ext = getFileExtension(filename)
  return allowedTypes.includes(ext)
}

/**
 * 读取文件为文本
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

/**
 * 读取文件为 Data URL
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * 下载文件
 */
export function downloadFile(data: Blob | string, filename: string): void {
  const blob = typeof data === 'string' ? new Blob([data]) : data
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * 检查是否为图片文件
 */
export function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
  return checkFileType(filename, imageExtensions)
}

/**
 * 检查是否为 Excel 文件
 */
export function isExcelFile(filename: string): boolean {
  const excelExtensions = ['xls', 'xlsx']
  return checkFileType(filename, excelExtensions)
}

/**
 * 检查是否为 CSV 文件
 */
export function isCSVFile(filename: string): boolean {
  return getFileExtension(filename) === 'csv'
}

