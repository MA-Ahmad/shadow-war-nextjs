import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Box,
  useColorModeValue,
  Center,
  Text,
  Heading,
  Flex,
  Avatar,
  VStack,
  Divider,
  Fade,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { BASE_URL } from '@/constants'

const Callback = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [oauthVerifier, setOauthVerifier] = useState('')
  const [oauthToken, setOauthToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const bg = useColorModeValue('white', '#2f3244')
  const router = useRouter()

  useEffect(() => {
    // Extract the query parameters from the URL
    const { oauth_verifier, oauth_token } = router.query

    if (oauth_verifier) {
      setOauthVerifier(oauth_verifier)
    }
    if (oauth_token) {
      setOauthToken(oauth_token)
    }

    if (oauth_verifier && oauth_token) {
      fetchUserInfo(oauth_verifier, oauth_token)
    }

    // Now you can use the oauthVerifier in your logic, such as sending it to your backend
    console.log('oauth_verifier:', oauth_verifier)
    console.log('oauth_token:', oauth_token)
  }, [router.query])

  const fetchUserInfo = (oauthVerifier, oauthToken) => {
    if (oauthVerifier) {
      const postData = {
        oauthVerifier: oauthVerifier,
        oauthToken: oauthToken,
      }

      axios
        .post(`${BASE_URL}/twitter/callback`, postData)
        .then((response) => {
          console.log('POST response:', response.data)
          if (response.data.success) {
            setIsSuccess(response.data.success)
          }
          // Handle the response from the server as needed
        })
        .catch((error) => {
          console.error('POST error:', error)
          // Handle the error as needed
        })
    }
  }

  return (
    <>
      {isSuccess && (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          User logged in successfully
        </Flex>
      )}
      {/* {userInfo && (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
          <Center>
            <Box
              maxH="400px"
              minH="354px"
              w="345px"
              boxShadow="lg"
              rounded="md"
              p={6}
              overflow="hidden"
              cursor="pointer"
              _hover={{ boxShadow: 'lg' }}
              bg={bg}
              role="group"
            >
              <VStack spacing={5}>
                <motion.div whileHover={{ y: -5, scale: 1.1 }}>
                  <Box
                    boxShadow="xl"
                    _hover={{ boxShadow: 'lg' }}
                    borderRadius="full"
                  >
                    <Avatar
                      _groupHover={{ width: '5rem', height: '5rem' }}
                      size="xl"
                      src={userInfo.profile_image_url_https}
                    />
                  </Box>
                </motion.div>
                <Heading
                  fontSize="xl"
                  fontFamily="body"
                  textTransform="capitalize"
                  noOfLines={2}
                >
                  {userInfo.name}
                </Heading>
                <Text
                  color="gray.500"
                  fontSize="lg"
                  noOfLines={{ base: 3, md: 4 }}
                  _groupHover={{ display: 'none' }}
                  display="block"
                >
                  {userInfo.followers_count} Followers
                </Text>
                <Fade in>
                  <Text
                    color="gray.500"
                    fontSize="lg"
                    noOfLines={{ base: 3, md: 4 }}
                    _groupHover={{ display: 'block' }}
                    display="none"
                  >
                    {userInfo.description}
                  </Text>
                </Fade>
                <Divider />
                <Flex alignItems="center" justify="center" w="100%">
                  <Box textAlign="center">Username: {userInfo.screen_name}</Box>
                </Flex>
              </VStack>
            </Box>
          </Center>
        </Container>
      )} */}
    </>
  )
}

export default Callback
