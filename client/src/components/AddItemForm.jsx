import apiClient from '../apiClient'
import {useAuthHeader, useAuthUser} from 'react-auth-kit'
import { Input, Button, Box, Heading, VStack, Container } from '@chakra-ui/react'
import { useFormik } from 'formik'

export const AddItemForm = () => {
    const authHeader = useAuthHeader()
    const user = useAuthUser()

    const config = {
      headers: { 
        Authorization: authHeader(),
        'Content-Type': 'multipart/form-data' 
      }
    }

    const formik = useFormik({
      initialValues: { 
        name: '',
        price: 0,
        description: '',
        image: ''
      },
      onSubmit: values => {
        console.log(values.image)
        apiClient.post('/product', values, config).then((res) => {
            console.log(res)
        })
      }
    });


    return(
        <Container maxW="3xl">

        <Box m={'20px auto'} p={4} backgroundColor={'white'} borderRadius={'10px'}>
          <Heading size={'xs'} textAlign={'center'}>Add a product</Heading>

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Name</Heading>
              <Input id='name' name='name' onChange={formik.handleChange} value={formik.values.name} 
                  placeholder='Type the name of the product' size='lg' htmlSize={7}/>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Price</Heading>
              <Input id='price' name='price' onChange={formik.handleChange} value={formik.values.price} 
                  placeholder='Price of one' size='lg'/>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Description</Heading>
              <Input id='description' name='description' onChange={formik.handleChange} value={formik.values.description} 
                  placeholder='Write a description of the product' size='lg' htmlSize={7}/>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Image</Heading>
              <Input id='image' name='image' 
                  onChange={(e) => {formik.setFieldValue('image', e.currentTarget.files[0])}} 
                  value={undefined}
                  type={'file'} size='md'/>
            </VStack>

            <Button marginTop={'20px'} variant={'solid'} type={'submit'}>Submit</Button>
          </form>
        </Box>
      </Container>
    )
}