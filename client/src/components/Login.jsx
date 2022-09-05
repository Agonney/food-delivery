import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  import * as React from 'react'
import { useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import apiClient from '../apiClient'
import { useSignIn, useAuthUser, useIsAuthenticated } from 'react-auth-kit'

  
export const Login = () => {
    const isAuthenticated = useIsAuthenticated()
    if(isAuthenticated()){
        return <Navigate to='/' replace />
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const signIn = useSignIn()

    const submitLogin = () => {
        apiClient.post('/user/login', {email, password})
                .then((res)=>{
                    if(res.status === 200){
                        if(signIn({token: res.data.token,
                                   expiresIn:180,
                                   tokenType: "",
                                   authState: res.data.registeredUser})){
                            navigate('/restaurants')
                        }else {
                            alert('failed')
                        }
                    }else{
                        alert('failed')
                    }
                }).catch((e) => {
                    alert(e)
                })
    }
    
    return(
        <Container
        maxW="lg"
        py={{
            base: '12',
            md: '24',
        }}
        px={{
            base: '0',
            sm: '8',
        }}
        >
        <Stack spacing="8">
            <Stack spacing="6">
            <Stack
                spacing={{
                base: '2',
                md: '3',
                }}
                textAlign="center"
            >
                <Heading
                size={useBreakpointValue({
                    base: 'xs',
                    md: 'sm',
                })}
                >
                Log in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <Button variant="link" colorScheme="blue" onClick={() => navigate('/signup')}>
                    Sign up
                </Button>
                </HStack>
            </Stack>
            </Stack>
            <Box
            py={{
                base: '0',
                sm: '8',
            }}
            px={{
                base: '4',
                sm: '10',
            }}
            bg={useBreakpointValue({
                base: 'transparent',
                sm: 'bg-surface',
            })}
            boxShadow={{
                base: 'none',
                sm: useColorModeValue('md', 'md-dark'),
            }}
            borderRadius={{
                base: 'none',
                sm: 'xl',
            }}
            >
            <Stack spacing="6">
                <Stack spacing="5">
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                </Stack>
                <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                </HStack>
                <Stack spacing="6">
                <Button variant="primary" onClick={() => submitLogin()}>Sign in</Button>
                </Stack>
            </Stack>
            </Box>
        </Stack>
        </Container>
      )
}

  