import { buildCookieStorage } from "../CookieStorage"
import { COUNTER } from "./cookieKeys"

export const counterCookieStorage = buildCookieStorage<number, number>({
  targetKey: COUNTER,
  desirializer: (value) => parseInt(value ?? "0"),
  serializer: (value?: number) => value?.toString()
})