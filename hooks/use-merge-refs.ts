'use client'

import { useCallback } from 'react'
import type { MutableRefObject, RefCallback } from 'react'

type ReactRef<T> = RefCallback<T> | MutableRefObject<T | null>

export function useMergeRefs<T>(...refs: ReactRef<T>[]) {
  return useCallback(
    (value: T | null) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value)
        } else if (ref) {
          ;(ref as MutableRefObject<T | null>).current = value
        }
      }
    },
    [refs]
  )
}
