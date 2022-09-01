import { Box, Button, Container, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export const Cta = () => {
    const navigate = useNavigate()

   return( 
  <Box as="section" bg="bg-surface">
    <Container py={{ base: '16', md: '24' }}>
      <Stack spacing={{ base: '8', md: '10' }}>
        <Stack spacing={{ base: '4', md: '5' }} align="center">
          <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Ready to Order?</Heading>
          <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
            Find and explore the best restaurants and order your preferred food.
          </Text>
        </Stack>
        <Stack spacing="3" direction={{ base: 'column', sm: 'row' }} justify="center">
          <Button onClick={() => navigate('/')} variant="secondary" size="lg">
            Learn more
          </Button>
          <Button onClick={() => navigate('/login')}  variant="primary" size="lg">
            Start ordering
          </Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
    )
   }