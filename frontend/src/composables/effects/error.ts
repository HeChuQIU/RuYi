/**
 * Effect 错误处理工具
 */

import { Effect, Cause, Exit } from 'effect'
import type { Effect as EffectType } from 'effect/Effect'

/**
 * 错误类型
 */
export interface EffectError {
  message: string
  cause?: unknown
  tag?: string
}

/**
 * 提取错误信息
 */
export function extractError<E>(exit: Exit.Exit<unknown, E>): EffectError | null {
  if (Exit.isSuccess(exit)) {
    return null
  }

  const cause = exit.cause
  if (Cause.isDie(cause)) {
    const error = cause.defect
    return {
      message: error instanceof Error ? error.message : String(error),
      cause: error,
    }
  }

  if (Cause.isFail(cause)) {
    const error = cause.value
    return {
      message: error instanceof Error ? error.message : String(error),
      cause: error,
      tag: 'fail',
    }
  }

  return {
    message: 'Unknown error',
    cause: cause,
  }
}

/**
 * 处理 Effect 错误
 */
export function handleEffectError<T, E, R>(
  effect: EffectType<T, E, R>,
  onError?: (error: EffectError) => void
): EffectType<T, never, R> {
  return Effect.catchAll(effect, (error) => {
    const errorInfo: EffectError = {
      message: error instanceof Error ? error.message : String(error),
      cause: error,
    }
    if (onError) {
      onError(errorInfo)
    }
    return Effect.fail(errorInfo)
  })
}

/**
 * 将 Effect 错误转换为用户友好的消息
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return '发生未知错误'
}

