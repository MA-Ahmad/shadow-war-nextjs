import React from 'react'
import { Button, Flex } from '@chakra-ui/react'

const DiscordLogin = () => {
  const handleLogin = () => {
    const clientID = '1141036152636321865'
    const redirectURI =
      'https://dbf7-223-123-22-132.ngrok-free.app/discord/callback'
    const responseType = 'code'

    const discordAuthURL = `https://discord.com/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=guilds`

    window.location.href = discordAuthURL
  }

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Button colorScheme="purple" size="lg" onClick={handleLogin}>
        Login with Discord
      </Button>
    </Flex>
  )
}

export default DiscordLogin
