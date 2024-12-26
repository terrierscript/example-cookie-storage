"use client"
import { Box, Button, Group, Stack } from "@mantine/core"
import { useCookieStore, useServerCookie } from "./CookieContext"

export const Counter2 = () => {

  // const ck2 = useCookieStore<string>({
  //   targetKey: "cnt2",
  // })
  const cookieCounter = useCookieStore<number>({
    targetKey: "cntr2",
    serializer: (value) => value.toString(),
    desirializer: (value) => value ? parseInt(value) : 0
  })

  const value = cookieCounter.getValue()
  return <Box>
    <Box>
      v:{value}
    </Box>
    <Group>
      <Button onClick={() => cookieCounter.setValue(value + 1)}>
        +
      </Button>
      <Button onClick={() => cookieCounter.setValue(value - 1)}>
        -
      </Button>
    </Group>
  </Box>
}