import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import { Card, CardBody, Box, Heading, CardHeader, Flex, Avatar, Menu, MenuItem, MenuButton, MenuList, Text, IconButton, Select,
    ModalOverlay, Modal, ModalBody, ModalHeader, ModalContent, ModalCloseButton, FormControl, FormLabel, Input, ModalFooter, Button } from '@chakra-ui/react'
import apiClient from '../apiClient';  
import {useState, useEffect} from 'react'
import { BsThreeDotsVertical, BsStarFill, BsStar } from 'react-icons/bs'
import { useForm } from 'react-hook-form'

export const ReviewList = ({itemId}) => {
    const user = useAuthUser()
    const authHeader = useAuthHeader()
    const [reviews, setReviews] = useState([])
    const [reviewToEdit, setReviewToEdit] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { handleSubmit, register, reset, formState: { errors, isSubmitting }} = useForm()


    const renderStars = (rating) => {
        const stars = []
        for(let i = 0; i < 5; i++){
            if(i < rating){
                stars.push(<BsStarFill size={'30px'}/>)
            }
            else {
                stars.push(<BsStar size={'30px'}/>)
            }
        }
        return stars
    }

    let config = {
        headers: { 
          Authorization: authHeader(),
          'Content-Type': 'application/json' 
        },
        params: {productId: itemId}
    }

    useEffect(()=> {
        apiClient.get('/review/', config).then((res) => {
            setReviews(res.data)
        }).catch((error) =>{
            console.log(error)
        })
    }, [])


    const deleteReview = (id) => {
        let deleteConfig = {...config, params: {id}}
        apiClient.delete('/review/', deleteConfig).then((res) => {
            const deletedReview = reviews.find((review) => review.id === id)
            setReviews(reviews.filter(review => review !== deletedReview))
            
        }).catch((error) =>{
            console.log(error)
        })
    }

    const onSubmit = values => {
        if(values.rating === reviewToEdit.rating.toString() && values.description === reviewToEdit.description){
          return
        }

        const id = reviewToEdit.id
  
        let putConfig = {...config, params: {id}}
        apiClient.put('/review/', values, putConfig).then((res) => {
          const updatedReview = reviews.find((review) => review.id === id)
          setReviews(reviews.filter(review => review !== updatedReview))
          setIsModalOpen(false)
          reset()
        }).catch((error) =>{
              console.log(error)
        })
    }

    return (
        <Flex m={'20px auto'} w='100%' direction={'row'} gap={'20px'} p={4} borderRadius={'10px'}>
            {reviews.map((review) => {
                return (
                    <Card maxW='md'>
                        <CardHeader>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={review.customer.name} />

                                <Box>
                                <Heading size='sm'>{review.customer.name}</Heading>
                                </Box>
                            </Flex>
                            <Menu width={'10px'}>
                                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />}>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => {
                                        setReviewToEdit(review)
                                        setIsModalOpen(true)
                                    }}>Edit</MenuItem>
                                    {(review.customer.id === user().id || user().role === 'admin') && <MenuItem onClick={() => deleteReview(review.id)}>Delete</MenuItem>}
                                </MenuList>
                            </Menu>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Flex direction={'row'} gap={'5px'} mb={'20px'}>
                                {renderStars(review.rating)}
                            </Flex>
                            <Text>
                            {review.description}
                            </Text>
                        </CardBody>
                        </Card>
                )
            })}

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        reset()
                        }}
                    >
                    <ModalOverlay />
                    <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>Edit review</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
            
                        <FormControl mt={4}>
                            <FormLabel>Rating</FormLabel>
                            <Select defaultValue={reviewToEdit?.rating} placeholder='Select a rating' {...register('rating', {required: 'This is required'})} >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input defaultValue={reviewToEdit?.description} placeholder='Description' {...register('description')}/>
                        </FormControl>
                        </ModalBody>
                        
            
                        <ModalFooter>
                        <Button colorScheme='blue' mr={3} type={'submit'}>
                            Save
                        </Button>
                        <Button onClick={() => {
                            setIsModalOpen(false)
                            reset()
                            }}>Cancel</Button>
                        </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
        </Flex>
    )
}