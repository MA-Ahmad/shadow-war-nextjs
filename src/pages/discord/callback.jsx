import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BASE_URL } from '@/constants'
import { setToLocalStorage, getFromLocalStorage } from '@/utils/storage'

const Callback = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const { code } = router.query

    // if (code) {
    //   apiCall(code)
    // }

    console.log('code =====>', code)
  }, [router.query])

  const apiCall = (code) => {
    const headers = {
      'Content-Type': 'application/json',
      'Auth-Email': getFromLocalStorage('authEmail'),
      'Auth-Token': getFromLocalStorage('authToken'),
    }

    axios
      .get(`${BASE_URL}/discord/callback?code=${code}`, { headers })
      .then((response) => {
        console.log('POST response:', response.data)
        if (response.data.success) {
          setIsSuccess(response.data.success)
          setToLocalStorage('discordVerified', true)
          router.push('/social-login')
        }
      })
      .catch((error) => {
        console.error('POST error:', error)
      })
  }
  return (
    <>
      {isSuccess && (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          You're in server
        </Flex>
      )}
    </>
  )
}

export default Callback
