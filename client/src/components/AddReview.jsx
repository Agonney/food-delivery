import { useForm } from 'react-hook-form'
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import { Textarea, Button, Box, Heading, VStack, Stack, Select, SimpleGrid, useToast } from '@chakra-ui/react'
import apiClient from '../apiClient';  

export const AddReview = ({itemId}) => { 
    const user = useAuthUser()
    const authHeader = useAuthHeader()
    const { handleSubmit, register, formState: { errors, isSubmitting }} = useForm()
    const toast = useToast()

    const onSubmit = values => {
        const review = {
          ...values,
          customerId: user().id,
          productId: itemId
        }

        const config = {
            headers: { 
              Authorization: authHeader(),
              'Content-Type': 'application/json' 
            }
          }

        apiClient.post('/review', review, config).then((res) => {
          toast({
            title: 'Review added',
            description: `Review has been successfully added.`,
            status: 'success',
            duration: 2500,
            isClosable: true
          })
        }).catch((error) => {
          console.log(error)
          toast({
            title: 'Review could not be added',
            description: `Could not add review. Error: ${error.response.data}`,
            status: 'error',
            duration: 2500,
            isClosable: true
          })
        })
    }

    return (
             <Stack spacing={{ base: 6, md: 10 }}>
                <Box m={'20px auto'} w='50%' p={4} backgroundColor={'white'} borderRadius={'10px'} float={'left'}>
                <Heading size={'xs'} textAlign={'center'}>Add a review</Heading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={'5px'} marginBottom={'10px'}>
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
                        <Textarea {...register('description', {required: 'This is required'})} 
                            placeholder='Write your review here...' size='lg' htmlSize={7}/>
                    </VStack>
                    <Button marginTop={'20px'} variant={'solid'} type={'submit'}>Submit</Button>
                </form>
            </Box>
             </Stack>
    )
}