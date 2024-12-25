import { deleteCookie, setCookie } from "cookies-next"
import { getCookies } from "cookies-next/client"
import { CookieListItem } from "next/dist/compiled/@edge-runtime/cookies"
import type { cookies } from 'next/headers'
import { CookieValue } from "./CookieContext"
import { serialize } from 'cookie'
type SerializeOptions = CookieListItem

export type BuildCookieStorageParams<TInput, TOutput> = {
  targetKey: string,
  desirializer?: (value?: string) => TOutput
  serializer?: (value?: TInput) => string | undefined,
  serializeOption?: SerializeOptions
}
type Listener = () => void
const noopParser = (value?: any) => value
export function buildCookieStorage<TInput = string, TOutput = string>(
  params: BuildCookieStorageParams<TInput, TOutput>
) {
  return (cookieValues?: CookieValue) => {
    const listeners = new Set<Listener>()
    const desirializeFn = params.desirializer ?? noopParser
    const serializeFn = params.serializer ?? noopParser

    return {
      subscribe: (listener: Listener) => {
        listeners.add(listener)
        return () => {
          listeners.delete(listener)
        }
      },
      getValue: async (cookieValues?: CookieValue) => {
        const cv = cookieValues ?? getCookies()
        const rawValue = cv?.[params.targetKey]

        return desirializeFn(rawValue)
      },
      setValue: (value: TInput) => {
        const serializedValue = serializeFn(value)
        if (serializedValue === null) {
          deleteCookie(params.targetKey)
        } else {
          const cookieOptions = params.serializeOption ?? {}
          // setCookie(params.targetKey, serializedValue, cookieOptions)
          document.cookie = serialize(params.targetKey, serializedValue, cookieOptions)
          console.log(document.cookie)
        }
        listeners.forEach((listener) => {
          console.log({ listener })
          return listener()
        })
        return value
      }
    }
  }
}