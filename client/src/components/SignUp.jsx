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
import {useNavigate, Navigate} from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'


const submitLogin = (props) => {
    alert(props.email)
}
  
export const SignUp = () => {
    const isAuthenticated = useIsAuthenticated()
    if(isAuthenticated()){
        return <Navigate to='/' replace />
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
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
                Create an account
                </Heading>
                <HStack spacing="1" justify="center">
                <Text color="muted">Already have an account?</Text>
                <Button variant="link" colorScheme="blue" onClick={() => navigate('/login')}>
                    Sign in
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
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                </Stack>
                <Stack spacing="6">
                <Button variant="primary" onClick={() => submitLogin({email, password})}>Sign up</Button>
                </Stack>
            </Stack>
            </Box>
        </Stack>
        </Container>
      )
}

  