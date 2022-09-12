import { Container, VStack, useColorModeValue, HStack, Heading, 
    Stack, FormControl, FormLabel, Input,  Button, Checkbox,
    InputGroup, InputLeftElement, RadioGroup, Radio, Text, Icon, Divider, FormErrorMessage
 } from "@chakra-ui/react"
import { FaPhone } from "react-icons/fa"
import { Visa, Mastercard, Googlepay, Applepay } from 'react-pay-icons'
import { CheckoutProduct } from "../components/CheckoutProduct"
import { BsChatDots } from 'react-icons/bs'
import { FiMail } from "react-icons/fi"
import { BiPhone } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import apiClient from '../apiClient'


export const Checkout = () => {
    const cart = useSelector((state) => state.cart)
    const user = useAuthUser()
    const authHeader = useAuthHeader()
    const [paymentMethod, setPaymentMethod ] = useState('1')
    const totalPrice = () => {
        let sum = 0
        for(var productPrice of cart.total){
            sum+=productPrice.price
        }
        return Math.round(sum * 100) / 100
    }

    const { handleSubmit, register, formState: { errors, isSubmitting }} = useForm()

    const onSubmit = values => {
        let itemsWithQuantity = []
        for(let item of cart.total){
            const itemToAdd = {
                product: item.id,
                quantity: item.price / cart.items.find(element => element.id === item.id).price
            }

            itemsWithQuantity.push(itemToAdd)
        }

        const order = {
            values,
            paymentMethod: paymentMethod === '1' ? 'creditCard' : 'cash',
            productQuantity: itemsWithQuantity,
            totalPrice: totalPrice() + 1.5,
            userId: user().id
        }

        const config = {
            headers: { 
              Authorization: authHeader(),
              'Content-Type': 'application/json' 
            }
          }

        apiClient.post('/order', order, config).then((res) => {
            console.log(res)
        })
    }


  

    return(
        <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HStack spacing={0}>
                <VStack
                    as="form"
                    spacing={8}
                    w="100%"
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded="lg"
                    boxShadow="lg"
                    p={{ base: 5, sm: 10 }}
                    roundedRight={'none'}
                    h={'1000px'}
                >
                    <Heading alignSelf={'start'} size={'xs'}>Shipping Information</Heading>
                    <VStack spacing={4} w="100%">
                        <FormControl id="name" isInvalid={errors.name}>
                            <FormLabel>Full name</FormLabel>
                            <Input type="text" placeholder="Your full name" rounded="md" {...register('name', {required: 'This is required'})} />
                        </FormControl>
                        <FormControl id="streetAddress" isInvalid={errors.streetAddress}>
                        <FormLabel>Street Address</FormLabel>
                        <Input type="text" placeholder="123 Example Street" rounded="md"{...register('streetAddress', {required: 'This is required'})} />
                        </FormControl>
                        <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                            <FormControl id="zip" isInvalid={errors.zip}>
                                <FormLabel>Zip Code</FormLabel>
                                <Input w='50%' type="number" placeholder="Zip Code" rounded="md" {...register('zipCode', {required: 'This is required'})} />
                            </FormControl>
                            <FormControl id="city" isInvalid={errors.city}>
                                <FormLabel>City</FormLabel>
                                <Input type="text" placeholder="City" rounded="md" {...register('city', {required: 'This is required'})} />
                            </FormControl>
                        </Stack>
                        <FormControl id="phoneNumber" isInvalid={errors.phoneNumber}>
                            <FormLabel>Phone number</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                zIndex={1}
                                pointerEvents='none'
                                children={<FaPhone color='gray.300' />}
                                />
                                <Input type='tel' placeholder='Phone number' {...register('phoneNumber', {required: 'This is required'})} />
                            </InputGroup>
                        </FormControl>
                        <Checkbox alignSelf={'start'}>Billing address is same as shipping</Checkbox>

                        <Heading paddingTop={10} size={'xs'} alignSelf={'start'}>Payment Information</Heading>
                        
                        <RadioGroup value={paymentMethod} onChange={setPaymentMethod} alignSelf={'start'} paddingTop={8}>
                            <Stack spacing={5} direction='row' alignContent={'start'}>
                                <Radio value='1' size={'lg'}>
                                    <VStack spacing={0} alignItems={'start'}>
                                        <Text as={'b'} fontSize={17}>Credit Card</Text>
                                        <Text fontSize={17} color={'gray.700'}>Pay with credit card</Text>
                                        <HStack>
                                            <Icon w={10} h={10} as={Visa} />
                                            <Icon w={10} h={10} as={Mastercard} />
                                            <Icon w={10} h={10} as={Googlepay} />
                                            <Icon w={10} h={10} as={Applepay} />
                                        </HStack>
                                    </VStack>
                                </Radio>
                                <Radio value='2' size={'lg'} fontSize={17} paddingLeft={40}>
                                    Pay in-person (cash)
                                </Radio>
                            </Stack>
                        </RadioGroup>

                        {paymentMethod === '1' && 
                            <>
                                <Stack paddingTop={8} w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                                    <FormControl id="cc">
                                        <FormLabel>Credit card number</FormLabel>
                                        <Input type="number" placeholder="Card number" rounded="md" />
                                    </FormControl>
                                    <FormControl id="ccName">
                                        <FormLabel>Name on card</FormLabel>
                                        <Input type="text" placeholder="Card name" rounded="md" />
                                    </FormControl>
                                </Stack>

                                <Stack paddingTop={8} w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                                    <FormControl id="expiryDate">
                                        <FormLabel>Expiry date</FormLabel>
                                        <Input type="number" placeholder="MM/YYYY" rounded="md" />
                                    </FormControl>
                                    <FormControl id="cvc">
                                        <FormLabel>CVV/CVC</FormLabel>
                                        <Input type="number" placeholder="CVC" rounded="md" />
                                    </FormControl>
                                </Stack>

                                
                            </>
                        }
                        
                        <FormErrorMessage>
                                {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </VStack>
                </VStack>  

                <VStack
                    spacing={8}
                    w="60%"
                    bg={useColorModeValue('white.100', 'gray.700')}
                    rounded="lg"
                    boxShadow="lg"
                    p={{ base: 5, sm: 10 }}
                    roundedLeft={'none'}
                    h={'1000px'}
                    overflow='scroll'
                >
                    <Heading alignSelf={'start'} size={'xs'}>Order Summary</Heading>
                    {cart.items.map((product, i) => {
                        return <CheckoutProduct product={product} key={i}  />
                    })}
                    <VStack spacing={3} w='100%'>    
                        <HStack w='100%' justifyContent='space-between'>
                            <Text>Subtotal</Text>
                            <Text>${totalPrice()}</Text>
                        </HStack>
                        <HStack w='100%' justifyContent='space-between'>
                            <Text>Shipping cost</Text>
                            <Text>+$1.50</Text>
                        </HStack>
                        <Divider paddingTop='3'/>
                    </VStack>
                    
                    <HStack w='100%' justifyContent='space-between'>
                            <Text fontWeight='semibold' fontSize={18}>Order Total</Text>
                            <Text fontWeight='semibold' fontSize={18}>${totalPrice() + 1.5}</Text>
                    </HStack>

                    <Button backgroundColor='blue.500' type="submit"
                            isLoading={isSubmitting}
                            isDisabled={cart.items.length === 0}
                            color='white' 
                            w='100%' h='80px' fontSize={18}
                            _hover={{ bg: 'blue.400' }}>Place Order</Button>

                    <VStack w='100%' spacing={4}>
                        <Text alignSelf='start' fontSize={14}>Have questions? Or need help to complete your order?</Text>
                        <HStack w='100%' spacing={10}>
                                <HStack spacing={2}>
                                    <Icon as={BsChatDots}  color='blue.500' h='20px' w='20px'/>
                                    <Text fontSize={15} fontWeight='semibold' color='blue.500'>Live Chat</Text>
                                </HStack>
                                <HStack spacing={2}>
                                    <Icon as={BiPhone}  color='blue.500' h='20px' w='20px'/>
                                    <Text fontSize={15} fontWeight='semibold' color='blue.500'>Phone</Text>
                                </HStack>
                                <HStack spacing={2}> 
                                    <Icon as={FiMail}  color='blue.500' h='20px' w='20px'/>
                                    <Text fontSize={15} fontWeight='semibold' color='blue.500'>Email</Text>
                                </HStack>
                        </HStack>
                    </VStack>
                    
                </VStack>   
                </HStack>
            </form>
        </Container>
    )
}