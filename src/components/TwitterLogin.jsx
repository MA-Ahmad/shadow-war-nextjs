import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'
import { BASE_URL } from '@/constants'

const TwitterLoginButton = () => {
  const handleTwitterLogin = () => {
    const twitterLoginUrl = `${BASE_URL}/authorize_user`
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
