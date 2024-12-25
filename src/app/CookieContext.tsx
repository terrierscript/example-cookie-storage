"use client"
import { createContext, FC, PropsWithChildren, useContext } from "react"

export type CookieValue = Partial<Record<string, string>>

const CookieContext = createContext({})

export const CookieProvider: FC<PropsWithChildren<{ value: CookieValue }>> = ({ value, children }) => {
  return <CookieContext.Provider value={value}>
    {children}
  </CookieContext.Provider>
}

export const useCookie = () => {
  return useContext(CookieContext)
}
