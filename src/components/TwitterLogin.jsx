import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'

const BASE_URL = 'http://localhost:3001'

const TwitterLoginButton = () => {
  const handleTwitterLogin = () => {
    const twitterLoginUrl = `${BASE_URL}/login_with_twitter`
    window.location.href = twitterLoginUrl
  }

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Button
        leftIcon={<FaTwitter />}
        colorScheme="blue"
        size="lg"
        onClick={handleTwitterLogin}
      >
        Login with Twitter
      </Button>
    </Flex>
  )
}

export default TwitterLoginButton
