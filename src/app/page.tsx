import Head from 'next/head'
import React from 'react'
import { SampleComponent } from '../components/SampleComponent'
import { Box, Container } from '@mantine/core'
import { getCookies } from 'cookies-next'
import { cookies } from 'next/headers'
import { Counter } from './Counter'
import { Counter2 } from './Counter2'

// const getServerCookies = async (): Promise<CookieValue> => {
//   const response = await getCookies({ cookies })
//   const ck = await cookies()
//   ck.set("x", "y", {
//     expires: 10
//   })
//   return response
// }
export default async function Home() {
  // const ck = await getServerCookies()
  // console.log(ck)
  return (
    <Box>
      <Container>
        <SampleComponent />
        <Counter2 />
        {/* <Counter /> */}
      </Container>
    </Box>
  )
}
