import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BASE_URL } from '@/constants'

const UserInfo = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const { code } = router.query

    if (code) {
      apiCall(code)
    }

    console.log('code =====>', code)
  }, [router.query])

  const apiCall = (code) => {
    axios
      .get(`${BASE_URL}/discord/callback?code=${code}`)
      .then((response) => {
        console.log('POST response:', response.data)
        // setIsSuccess
        // if (response.data.user_data) {
        //   setUserInfo(response.data.user_data)
        // }
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error('POST error:', error)
        // Handle the error as needed
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

export default UserInfo
