import apiClient from '../apiClient'
import { useForm, Controller } from 'react-hook-form'
import {useAuthHeader, useAuthUser} from 'react-auth-kit'
import { Input, Button, Box, Heading, VStack, Container, FormControl, FormLabel, Select, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const AddApplication = () => {
    const authHeader = useAuthHeader()
    const { handleSubmit, register, control, formState: { errors, isSubmitting }} = useForm()
    const user = useAuthUser()
    const [applicants, setApplicants] = useState([])
    const toast = useToast()

    let config = {
        headers: { 
          Authorization: authHeader(),
          'Content-Type': 'application/json' 
        }
    }

    useEffect(()=> {
        apiClient.get('/applicant/', config).then((res) => {
            setApplicants(res.data)
        }).catch((error) =>{
            console.log(error)
        })
    }, [])

    const [selectedApplicant, setSelectedApplicant] = useState(null);

    const handleSelectChange = (event) => {
        // const selectedId = parseInt(event.target.value, 10);
        // console.log(selectedId)
        const selected = applicants.find((option) => option.id === event.target.value);
        setSelectedApplicant(selected);
    };

    console.log(applicants)
    console.log(selectedApplicant)

    const onSubmit = values => {
        const valuesToSend = {
            ...values,
            applicantId: selectedApplicant.id
        }

        const config = {
            headers: { 
              Authorization: authHeader(),
              'Content-Type': 'application/json' 
            }
          }

        apiClient.post('/application', valuesToSend, config).then((res) => {
          toast({
            title: 'Application created',
            description: `Application ${res.data.name} has been successfully created.`,
            status: 'success',
            duration: 2500,
            isClosable: true
          })
        }).catch((error) => {
          console.log(error)
          toast({
            title: 'Application could not be created',
            description: `Could not create application. Error: ${error.response.data}`,
            status: 'error',
            duration: 2500,
            isClosable: true
          })
        })
    }


    return(
        <Container maxW="3xl">

        <Box m={'20px auto'} p={4} backgroundColor={'white'} borderRadius={'10px'}>
          <Heading size={'xs'} textAlign={'center'}>Add an application</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Job</Heading>
              <Input id='job' name='job' {...register('job', {required: 'This is required'})} 
                  placeholder='Type the job' size='lg' htmlSize={7}/>
            </VStack>
            <VStack spacing={'5px'}>
              <Heading size={'xs'} alignSelf={'start'}>Education</Heading>
              <Input id='education' name='education' {...register('education', {required: 'This is required'})} 
                  placeholder='Type the education' size='lg' htmlSize={7}/>
            </VStack>
            <VStack spacing={'5px'} mt={'20px'}>
                <FormControl>
                    <Heading size={'xs'} alignSelf={'start'}>Status</Heading>
                    <Controller
                        name="status"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                        <Select {...field} id="status" placeholder="Select status">
                            <option value="Accepted">Accepted</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Pending">Pending</option>
                        </Select>
                        )}
                    />
                </FormControl>
            </VStack>

            <VStack>
                <FormControl>
                    <FormLabel htmlFor="option">Select an applicant:</FormLabel>
                    <Select
                        id="option"
                        name="option"
                        onChange={handleSelectChange}
                        value={selectedApplicant ? selectedApplicant.id : ''}
                    >
                        <option value="">Select an applicant</option>
                        {applicants.map((applicant) => (
                        <option key={applicant.id} value={applicant.id}>
                             {applicant.id}
                        </option>
                        ))}
                    </Select>
                </FormControl>
            </VStack>

            <Button marginTop={'20px'} variant={'solid'} type={'submit'}>Submit</Button>
          </form>
        </Box>
      </Container>
    )
}