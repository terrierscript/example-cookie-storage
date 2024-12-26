"use client"
import { SerializeOptions } from "cookie"
import { deleteCookie, getCookie, setCookie } from "cookies-next/client"
import { createContext, FC, PropsWithChildren, useContext, useSyncExternalStore } from "react"

export type CookieValue = Partial<Record<string, string>>

const CookieContext = createContext<CookieValue>({})

export const CookieProvider: FC<PropsWithChildren<{ value: CookieValue }>> = ({ value, children }) => {
  return <CookieContext.Provider value={value}>
    {children}
  </CookieContext.Provider>
}

type Listener = () => void


// type RawCookieStorageParams = {
//   targetKey: string,
//   cookieOption?: SerializeOptions
//   desirializer: undefined
//   serializer: undefined
// }
// type CookieStorageParams<TValue> = TValue extends string
//   ? RawCookieStorageParams
//   : SerializeCookieStorageParams<TValue>
type CookieStorageParams<TValue> = {
  targetKey: string,
  cookieOption?: SerializeOptions
  desirializer: (value?: string) => TValue
  serializer: (value: TValue) => string | undefined,
}

export function useCookieStore<TValue>(params: CookieStorageParams<TValue>) {
  const serverCookie = useContext(CookieContext)
  const { targetKey, cookieOption } = params
  const listeners = new Set<Listener>()

  const desirializeFn = params.desirializer
  const serializeFn = params.serializer

  const value = useSyncExternalStore<string | undefined>((listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, () => getCookie(targetKey), () => serverCookie[targetKey])

  return {
    getValue: () => {
      return desirializeFn ? desirializeFn(value) : value
    },
    setValue: (value: TValue) => {
      const serializedValue = serializeFn ? serializeFn(value) : value
      if (serializedValue) {
        setCookie(targetKey, serializedValue, cookieOption ?? {})
      } else {
        deleteCookie(targetKey)
      }
      listeners.forEach(l => l())
    }
  }
}
