import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router';
import { useIsAuthenticated, useAuthHeader } from 'react-auth-kit';
import apiClient from '../apiClient';  
import { useDispatch } from 'react-redux'
import { addItem, addPrice } from '../state/cartReducer'
import { AddReview } from '../components/AddReview'
import { ReviewList } from '../components/ReviewList'

  export default function ItemDetails() {
    const isAuthenticated = useIsAuthenticated()
    if(!isAuthenticated()){
        return <Navigate to='/login' replace />
    }

    const authHeader = useAuthHeader()
    const { itemId } = useParams()
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()

    const config = {
      headers: { 
        Authorization: authHeader(),
        'Content-Type': 'application/json' 
      }
    }

    useEffect(() => {
      apiClient.get(`/product/${itemId}`, config).then((res) => {
        setProduct(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }, [])


    return (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={`http://localhost:3001/${product?.image}`}              
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {product?.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                €{product?.price} EUR
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore
                </Text>
                <Text fontSize={'lg'}>
                  {product?.description}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Features
                </Text>
  
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Tasty</ListItem>
                    <ListItem>Baked</ListItem>{' '}
                    <ListItem>Finger lickin' good</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Chilly like Audemars</ListItem>
                    <ListItem>Hot like Lava</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Product Details
                </Text>
  
                <List spacing={2}>
                <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Name:
                    </Text>{' '}
                    {product?.name}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Price:
                    </Text>{' '}
                    {product?.price} EUR
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Description:
                    </Text>{' '}
                    {product?.description}
                  </ListItem>
                </List>
              </Box>
            </Stack>
  
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              onClick={() => {  
                dispatch(addItem(product))
                dispatch(addPrice({id: product.id, price: product.price}))
                }}
              >
              Add to cart
            </Button>
  
            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text>Express delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>

        
        <AddReview itemId={itemId}/>
        <ReviewList itemId={itemId}/>
      </Container>
    );
  }