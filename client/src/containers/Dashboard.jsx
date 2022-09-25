import React from 'react'
import {useIsAuthenticated, useAuthHeader, useAuthUser} from 'react-auth-kit'
import { Navigate } from 'react-router-dom'
import { AddItemForm } from '../components/AddItemForm'
import { useState, useEffect } from 'react';
import { Button, Container, Tag, UnorderedList, ListItem, Heading, HStack, IconButton} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import DataTable from '../components/DataTable';
import apiClient from '../apiClient';
import { BiEdit } from 'react-icons/bi'
import { BsTrash } from "react-icons/bs"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { AddRestaurantForm } from '../components/AddRestaurantForm'

export const Dashboard = () => {
    const isAuthenticated = useIsAuthenticated()
    if(!isAuthenticated()){
        return <Navigate to='/login' replace />
    }

    const user = useAuthUser()
    if(user().role === 'user'){
      return <>Hi user</>
    }

    const authHeader = useAuthHeader()
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [productToEdit, setProductToEdit] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { handleSubmit, register, reset, formState: { errors, isSubmitting }} = useForm()

    let config = {
      headers: { 
        Authorization: authHeader(),
        'Content-Type': 'application/json' 
      }
    }

    const onEditClicked = (product) => {
      setProductToEdit(product)
      setIsModalOpen(true)
    }

    const deleteProduct = (id) => {
      let deleteConfig = {...config, params: {id}}
      apiClient.delete('/product/', deleteConfig).then((res) => {
          const deletedProduct = products.find((product) => product.id === id)
          setProducts(products.filter(product => product !== deletedProduct))
          
      }).catch((error) =>{
          console.log(error)
      })
  }


    useEffect(()=> {
        apiClient.get('/order/', config).then((res) => {
            setOrders(res.data)
        }).catch((error) =>{
            console.log(error)
        })
        apiClient.get('/product/', config).then((res) => {
          setProducts(res.data)
        }).catch((error) =>{
            console.log(error)
        })
        apiClient.get('/user/all', config).then((res) => {
          setUsers(res.data)
        }).catch((error) =>{
          console.log(error)
        })
    }, [])

    console.log(users)


    const ordersColumns = [
      {
        Header: "DATE",
        accessor: "date",
      },
      {
        Header: "CUSTOMER",
        accessor: "customer",
      },
      {
        Header: "PHONE NUMBER",
        accessor: "phoneNumber",
      },
      {
        Header: "ADDRESS",
        accessor: "address",
      },
      {
        Header: "ORDER",
        accessor: "order",
        Cell: (props) => {
          return <UnorderedList spacing={2}>
              {props.cell.value.map((item) => {
                  return <ListItem>{item}</ListItem>
              })}
          </UnorderedList>
        }
      },
      {
        Header: "TOTAL PRICE",
        accessor: "totalPrice",
      },
      {
        Header: "STATUS",
        accessor: "status",
        Cell: (props) => {
          return <Tag size='md' colorScheme={'red'} borderRadius='full'>{props.cell.value}</Tag>
        }
      }
    ]

    const productsColumn = [
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "PRICE",
        accessor: "price",
        Cell: (props) => {
          return props.cell.value + '€'
        }
      },
      {
        Header: "DESCRIPTION",
        accessor: "description",
      },
      {
        Header: "DATE ADDED",
        accessor: "date",
        Cell: (props) => {
          return new Date(props.cell.value).toUTCString()
        }
      },
      {
        Header: "ACTIONS",
        accessor: "actions",
        Cell: (props) => {
          return <HStack alignSelf={'end'}>
              <IconButton aria-label="Edit product" size={'sm'} colorScheme={'blue'} icon={<BiEdit />} onClick={() => onEditClicked(props.data[props.row.id])}/>
              <IconButton aria-label="Delete product" size={'sm'} colorScheme={'red'} icon={<BsTrash />} onClick={() => deleteProduct(props.data[props.row.id].id)} />
          </HStack>
        }
      },
    ]

    const usersColumns = [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "DATE",
        accessor: "date",
      },
      {
        Header: "ROLE",
        accessor: "role",
      },
    ]

    let tableDataOrders = []
    for(let order of orders){
      let orderArray= []
      order.products.map((item) => {orderArray.push(item.product.name + ' x' + item.quantity)})
      

      const dataEntry = {
        date: new Date(order.date).toUTCString(),
        customer: order.customerFullName,
        phoneNumber: order.customerPhone,
        address: order.customerAddress + ' ' + order.customerCity,
        order: orderArray,
        totalPrice: order.totalPrice+ '€',
        status: order.status.toUpperCase()
      }
      tableDataOrders.push(dataEntry)
    }

    const onSubmit = values => {
      if(values.name === productToEdit.name && values.price === productToEdit.price.toString() && values.description === productToEdit.description){
        return
      }

      const id = productToEdit.id

      let putConfig = {...config, params: {id}}
      apiClient.put('/product/', values, putConfig).then((res) => {
        const updatedProduct = products.find((product) => product.id === id)
        setProducts(products.filter(product => product !== updatedProduct))
        setIsModalOpen(false)
        reset()
      }).catch((error) =>{
            console.log(error)
      })
    }
    
    return (
      <Container maxW="7xl" py={5} px={{ base: 5, md: 1 }}>
        <Heading color={'blue.500'} mb={10} size={'md'} alignSelf={'end'}>Welcome to your dashboard</Heading> 
        

        <Tabs isFitted variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab>Orders</Tab>
            <Tab>Products</Tab>
            <Tab>Add Product</Tab>
            <Tab>Users</Tab>
            <Tab>Add Restaurant</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                <HStack display={'flex'}  alignItems={'normal'} >
                  <Heading color={'blue.500'} mb={10} size={'xs'}>List of orders</Heading>
                </HStack>
                <DataTable tableData={tableDataOrders} columnsData={ordersColumns} />
            </TabPanel>

            <TabPanel>
              <HStack display={'flex'}  alignItems={'normal'} >
                <Heading color={'blue.500'} mb={10} size={'xs'}>List of products</Heading>
              </HStack>
              <DataTable tableData={products} columnsData={productsColumn} />
            </TabPanel>

            <TabPanel>
              <AddItemForm />
            </TabPanel>

            <TabPanel>
            <HStack display={'flex'}  alignItems={'normal'} >
                <Heading color={'blue.500'} mb={10} size={'xs'}>List of users</Heading>
              </HStack>
              <DataTable tableData={users} columnsData={usersColumns} />
            </TabPanel>

            <TabPanel>
              <AddRestaurantForm />
            </TabPanel>
        
          </TabPanels>
        </Tabs>
        
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
            <ModalHeader>Edit product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input defaultValue={productToEdit?.name} placeholder='Name' {...register('name')} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Price (€)</FormLabel>
                <Input defaultValue={productToEdit?.price} placeholder='Price' step="any" type={'number'} {...register('price')}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input defaultValue={productToEdit?.description} placeholder='Description' {...register('description')}/>
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

      </Container>
    )
  }
  