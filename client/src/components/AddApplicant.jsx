import apiClient from '../apiClient'
import { useForm, Controller } from 'react-hook-form'
import {useAuthHeader, useAuthUser} from 'react-auth-kit'
import { Input, Button, Box, Heading, VStack, Container, FormControl, FormLabel, Checkbox, useToast } from '@chakra-ui/react'

export const AddApplicant = () => {
    const authHeader = useAuthHeader()
    const { handleSubmit, register, control, formState: { errors, isSubmitting }} = useForm()
    const user = useAuthUser()
    const toast = useToast()

    const onSubmit = values => {
        const config = {
            headers: { 
              Authorization: authHeader(),
              'Content-Type': 'application/json' 
            }
          }

        apiClient.post('/applicant', values, config).then((res) => {
          toast({
            title: 'Applicant created',
            description: `Applicant ${res.data.name} has been successfully created.`,
            status: 'success',
            duration: 2500,
            isClosable: true
          })
        }).catch((error) => {
          console.log(error)
          toast({
            title: 'Applicant could not be created',
            description: `Could not create applicant. Error: ${error.response.data}`,
            status: 'error',
            duration: 2500,
            isClosable: true
          })
        })
    }


    return(
        <Container maxW="3xl">

        <Box m={'20px auto'} p={4} backgroundColor={'white'} borderRadius={'10px'}>
          <Heading size={'xs'} textAlign={'center'}>Add an applicant</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Name</Heading>
              <Input id='name' name='name' {...register('name', {required: 'This is required'})} 
                  placeholder='Type the name of the applicant' size='lg' htmlSize={7}/>
            </VStack>
            <VStack spacing={'5px'} mt={'20px'}>
              <FormControl>
                <Heading size={'xs'} alignSelf={'start'}>Is Active</Heading>
                <Controller
                    name="isActive"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                    <Checkbox {...field} id="isActive" isChecked={field.value}>
                        {field.value ? 'Active' : 'Inactive'}
                    </Checkbox>
                    )}
                />
              </FormControl>
            </VStack>

            <Button marginTop={'20px'} variant={'solid'} type={'submit'}>Submit</Button>
          </form>
        </Box>
      </Container>
    )
}