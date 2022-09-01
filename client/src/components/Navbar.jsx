import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Img,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'

export const Navbar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  })

  const navigate = useNavigate()

  return (
    <Box
      as="section"
      pb={{
        base: '12',
        md: '24',
      }}
    >
      <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Container
          py={{
            base: '4',
            lg: '5',
          }}
        >
          <HStack spacing="10" justify="space-between">
            <Img src='./hslogoBlue.jpeg' h={50} onClick={() => navigate('/')}/>
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                  {/* {['Home', 'Restaurants', 'Items', 'About Us'].map((item) => (
                    <Button key={item}>{item}</Button>
                  ))} */}
                  <Button onClick={() => navigate('/')}>Home</Button>
                  <Button onClick={() => navigate('/')}>Restaurants</Button>
                  <Button onClick={() => navigate('/')}>Items</Button>
                  <Button onClick={() => navigate('/')}>About Us</Button>
                </ButtonGroup>
                <HStack spacing="3">
                  <Button onClick={() => navigate('/login')} variant="ghost">Sign in</Button>
                  <Button onClick={() => navigate('/signup')} variant="primary">Sign up</Button>
                </HStack>
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}