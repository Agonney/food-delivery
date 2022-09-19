import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuList,
  Image,
  MenuDivider,
  Tag,
  MenuItem,
  useBreakpointValue,
  useColorModeValue,
  CloseButton,
  Icon,
  TagLabel,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'
import {useIsAuthenticated, useSignOut} from 'react-auth-kit';
import { ShoppingCart } from './ShoppingCart';


export const Navbar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  })
  const isAuthenticated = useIsAuthenticated()
  const signOut = useSignOut()
  const navigate = useNavigate()


  const handleLogout = () => {
    signOut()
    navigate('/login')
  }

  return (
    <Box
      as="section"
      pb={{
        base: '12',
        md: '24',
      }}
      position={'sticky'}
      top='0'
      zIndex={2}
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
                  <Button onClick={() => navigate('/')}>Home</Button>
                  <Button onClick={() => navigate('/restaurants')}>Restaurants</Button>
                  <Button onClick={() => navigate('/items')}>Items</Button>
                  <Button onClick={() => navigate('/about')}>About Us</Button>
                </ButtonGroup>
                {isAuthenticated() ? (
                  <HStack spacing='3'>
                    <Button onClick={() => navigate('/orders')}>Orders</Button>
                    <ShoppingCart />
                    <Button onClick={() => handleLogout()} variant="ghost">Logout</Button>
                  </HStack> ) : (
                  <HStack spacing="3">
                    <Button onClick={() => navigate('/login')} variant="ghost">Sign in</Button>
                    <Button onClick={() => navigate('/signup')} variant="primary">Sign up</Button>
                  </HStack>
                  )
                }
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