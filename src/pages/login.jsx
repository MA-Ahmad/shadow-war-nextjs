import React, { useEffect, useState } from 'react'
import { Input, Button, FormControl, FormLabel, Center } from '@chakra-ui/react'
import axios from 'axios'
import { BASE_URL } from '@/constants'
import { setToLocalStorage, getFromLocalStorage } from '@/utils/storage'
import { useRouter } from 'next/router'

function EmailSignup() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [auth, setAuth] = useState({ authEmail: '', authToken: '' })
  const router = useRouter()

  useEffect(() => {
    const authEmail = getFromLocalStorage('authEmail')
    const authToken = getFromLocalStorage('authToken')

    if (authEmail && authToken) {
      router.push('/social-login')
    }
  }, [])

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleOtphange = (event) => {
    setOtp(event.target.value)
  }

  const handleSubmit = async () => {
    const userData = {
      email: email,
    }
    try {
      const response = await axios.post(`${BASE_URL}/signin`, userData)
      console.log(response.data) // Do something with the response if needed
      if (response.data.success) {
        setShowOtp(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleOtpSubmit = async () => {
    const otpData = {
      email: email,
      otp: otp,
    }
    try {
      const response = await axios.post(`${BASE_URL}/verify_otp`, otpData)
      console.log(response.data) // Do something with the response if needed
      if (response.data.success) {
        const { auth_token, auth_email } = response.data
        setToLocalStorage('authEmail', auth_email)
        setToLocalStorage('authToken', auth_token)
        router.push('/home')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Center h="100vh">
      {showOtp ? (
        <FormControl width="sm">
          <FormLabel>Otp</FormLabel>
          <Input
            type="number"
            placeholder="Enter your Otp"
            value={otp}
            onChange={handleOtphange}
          />
          <Button mt={4} colorScheme="teal" onClick={handleOtpSubmit}>
            Verify
          </Button>
        </FormControl>
      ) : (
        <FormControl width="sm">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
            Signin
          </Button>
        </FormControl>
      )}
    </Center>
  )
}

export default EmailSignup
