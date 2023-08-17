import React, { useState, useEffect } from 'react'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'
import { BASE_URL } from '@/constants'
import {
  clearLocalStorageCredentials,
  getFromLocalStorage,
} from '@/utils/storage'
import Link from 'next/link'

const LoginButtons = () => {
  const [verified, setVerified] = useState({ twitter: false, discord: false })

  useEffect(() => {
    const twitterVerified = getFromLocalStorage('twitterVerified')
    const disordVerified = getFromLocalStorage('discordVerified')

    if (twitterVerified) {
      setVerified((prev) => ({ ...prev, twitter: true }))
    }
    if (disordVerified) {
      setVerified((prev) => ({ ...prev, discord: true }))
    }
    if (twitterVerified && disordVerified) {
      clearLocalStorageCredentials()
    }
  }, [])

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
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {verified.twitter ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          p={4}
          rounded="md"
          bg="twitter.500"
          color="white"
        >
          Twitter verified
        </Flex>
      ) : (
        <Button
          leftIcon={<FaTwitter />}
          colorScheme="blue"
          size="lg"
          onClick={handleTwitterLogin}
        >
          Login with Twitter
        </Button>
      )}
      {verified.discord ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          p={4}
          rounded="md"
          bg="purple.500"
          color="white"
        >
          Discord Verified
        </Flex>
      ) : (
        <Button colorScheme="purple" size="lg" onClick={handleDiscordLogin}>
          Login with Discord
        </Button>
      )}

      {verified.discord && verified.twitter && <Link href="/login">Login</Link>}
    </Stack>
  )
}

export default LoginButtons
