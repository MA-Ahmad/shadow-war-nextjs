import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import TwitterLoginButton from '@/components/TwitterLogin'

function Index() {
  return (
    <ChakraProvider>
      <CSSReset />
      <TwitterLoginButton />
    </ChakraProvider>
  )
}

export default Index
