"use client"
import { Box, Button } from "@mantine/core"
import { counterCookieStorage } from "./cookies/counter"
import { Suspense, use, useSyncExternalStore } from "react"
import { useServerCookie } from "./CookieContext"


export type BuildCookieStorageParams<TInput, TOutput> = {
  targetKey: string,
  desirializer?: (value?: string) => TOutput
  serializer?: (value?: TInput) => string | undefined,
  serializeOption?: SerializeOptions
}

export const Counter = () => {
  const ck = useServerCookie()
  const counter = counterCookieStorage()
  const ckx = useSyncExternalStore(counter.subscribe,
    () => counter.getValue(),
    // () => 0 // counter.getValue(ck),
  )
  return <Suspense>
    <Box>
      <Box>v:{ckx}</Box>
      <Button onClick={() => {
        counter.setValue(ckx + 1)
      }}>+</Button>
    </Box>
  </Suspense>
}