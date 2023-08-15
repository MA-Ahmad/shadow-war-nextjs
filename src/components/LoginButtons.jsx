import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'
import { BASE_URL } from '@/constants'

const LoginButtons = () => {
  const handleTwitterLogin = () => {
    const twitterLoginUrl = `${BASE_URL}/authorize_user`
    window.location.href = twitterLoginUrl
  }

  const handleDiscordLogin = () => {
    const clientID = '1141036152636321865'
    const redirectURI = 'https://shadow-war-nextjs.vercel.app/discord/callback'
    const responseType = 'code'
    const discordAuthURL = `https://discord.com/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=guilds`
    window.location.href = discordAuthURL
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
      <Button
        colorScheme="purple"
        size="lg"
        onClick={handleDiscordLogin}
        ml={2}
      >
        Login with Discord
      </Button>
    </Flex>
  )
}

export default LoginButtons
