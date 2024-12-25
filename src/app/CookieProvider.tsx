"use server"
import { getCookies } from "cookies-next"
import { cookies } from "next/headers"
import { FC, PropsWithChildren } from "react"
import { CookieProvider, CookieValue } from "./CookieContext"




const getServerCookies = async (): Promise<CookieValue> => {
  const response = await getCookies({ cookies })
  return response ?? {}
}

export const CookieServerProvider: FC<PropsWithChildren> = async ({ children }) => {
  const value = await getServerCookies()
  return <CookieProvider value={value}>
    {children}
  </CookieProvider>

}