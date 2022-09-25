import { useForm } from 'react-hook-form'
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import { Input, Button, Box, Heading, VStack, Container, Select, HStack, useToast } from '@chakra-ui/react'
import apiClient from '../apiClient';


export const AddRestaurantForm = () => {
    const user = useAuthUser()
    const authHeader = useAuthHeader()
    const { handleSubmit, register, formState: { errors, isSubmitting }} = useForm()
    const toast = useToast()

    const onSubmit = values => {
        const restaurant = {
          ...values,
            image: values.image[0]
        }

        const config = {
            headers: { 
              Authorization: authHeader(),
              'Content-Type': 'multipart/form-data' 
            }
          }

        apiClient.post('/restaurant', restaurant, config).then((res) => {
          toast({
            title: 'Restaurant created',
            description: `Restaurant ${res.data.name} has been successfully created.`,
            status: 'success',
            duration: 2500,
            isClosable: true
          })
        }).catch((error) => {
          console.log(error)
          toast({
            title: 'Restaurant could not be created',
            description: `Could not create restaurant. Error: ${error.response.data}`,
            status: 'error',
            duration: 2500,
            isClosable: true
          })
        })
    }

    return(
        <Container maxW="3xl">

        <Box m={'20px auto'} p={4} backgroundColor={'white'} borderRadius={'10px'}>
          <Heading size={'xs'} textAlign={'center'}>Add a restaurant</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Name</Heading>
              <Input {...register('name', {required: 'This is required'})} 
                  placeholder='Type the name of the restaurant' size='lg' htmlSize={7}/>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Address</Heading>
              <Input {...register('address', {required: 'This is required'})}
                  placeholder='Restaurant address' size='lg'/>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>City</Heading>
              <Input {...register('city', {required: 'This is required'})}
                  placeholder='Restaurant city' size='lg'/>
            </VStack>
            <VStack spacing={'5px'}>
              <HStack justifyContent={'space-between'} w={'100%'}>
                <VStack spacing={'5px'}>
                  <Heading size={'xs'} alignSelf={'start'}>Latitude</Heading>
                  <Input  {...register('latitude', {required: 'This is required'})}
                      placeholder='Restaurant latitude' size='lg'/>
                </VStack>

                <VStack spacing={'5px'}>
                  <Heading size={'xs'} alignSelf={'start'}>Longitude</Heading>
                  <Input  {...register('longitude', {required: 'This is required'})}
                      placeholder='Restaurant longitude' size='lg'/>
                </VStack>
              </HStack>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Rating</Heading>
              <Select placeholder='Select a rating' {...register('rating', {required: 'This is required'})} >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
          </Select>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Description</Heading>
              <Input id='description' name='description' {...register('description', {required: 'This is required'})} 
                  placeholder='Write a description of the product' size='lg' htmlSize={7}/>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Image</Heading>
              <Input id='image' name='image' type={'file'} size='md' {...register('image', {required: 'This is required'})}/>
            </VStack>

            <Button marginTop={'20px'} variant={'solid'} type={'submit'}>Submit</Button>
          </form>
        </Box>
      </Container>
    )

}