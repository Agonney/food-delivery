import React from 'react'
import {useIsAuthenticated, useAuthUser, useAuthHeader} from 'react-auth-kit'
import { Navigate, renderMatches } from 'react-router-dom'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import {Collapse} from 'react-collapse';
import  '../components/AddItemForm/AddItemForm.css'
import { useState, useEffect } from 'react';
import { Button, Container, Tag, UnorderedList, ListItem, Divider, Heading, HStack, IconButton} from '@chakra-ui/react';
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

export const Restaurants = () => {
    const isAuthenticated = useIsAuthenticated()
    if(!isAuthenticated()){
        return <Navigate to='/login' replace />
    }

    const authHeader = useAuthHeader()
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
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
    }, [])


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

    const [isFormOpened, setIsFormOpened ] = useState(false)
    const [isOrdersTableOpened, setIsOrdersTableOpened ] = useState(true)
    const [isProductsTableOpened, setIsProductsTableOpened ] = useState(true)

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
        <Heading color={'blue.500'} mb={10} size={'md'} alignSelf={'end'}>Welcome to your restaurant dashboard</Heading> 
        <HStack display={'flex'}  alignItems={'normal'} >
          <Heading color={'blue.500'} mb={10} size={'xs'}>List of orders</Heading>
          <Button onClick={() => setIsOrdersTableOpened(!isOrdersTableOpened)}>{isOrdersTableOpened ? <>Hide</> : <>Show orders</>}</Button>
        </HStack>
        <Collapse  isOpened={isOrdersTableOpened}>
          <DataTable tableData={tableDataOrders} columnsData={ordersColumns} />
        </Collapse>

        <Divider my={10} borderWidth={'2px'}/>

        <HStack display={'flex'}  alignItems={'normal'} >
          <Heading color={'blue.500'} mb={10} size={'xs'}>List of products</Heading>
          <Button onClick={() => setIsProductsTableOpened(!isProductsTableOpened)}>{isProductsTableOpened ? <>Hide</> : <>Show products</>}</Button>
        </HStack>
        <Collapse  isOpened={isProductsTableOpened}>
          <DataTable tableData={products} columnsData={productsColumn} />
        </Collapse>

        <Divider my={10} borderWidth={'2px'}/>

        <Button onClick={() => setIsFormOpened(!isFormOpened)}>{isFormOpened ? <>Hide</> : <>Add Item</>}</Button>
        <Collapse  isOpened={isFormOpened}>
          <AddItemForm />
        </Collapse>

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
  