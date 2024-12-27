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

type CookieStorageParams = {
  targetKey: string,
  cookieOption?: SerializeOptions
}

export function useCookieStore(params: CookieStorageParams) {
  const serverCookie = useContext(CookieContext)
  const { targetKey, cookieOption } = params
  const listeners = new Set<Listener>()

  const value = useSyncExternalStore<string | undefined>((listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, () => getCookie(targetKey), () => serverCookie[targetKey])

  return {
    getValue: () => {
      return value
    },
    setValue: (value?: string) => {
      if (value) {
        setCookie(targetKey, value, cookieOption ?? {})
      } else {
        deleteCookie(targetKey)
      }
      listeners.forEach(l => l())
    }
  }
}
