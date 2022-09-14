import { useAuthUser, useIsAuthenticated, useAuthHeader } from "react-auth-kit"
import { Navigate } from "react-router"
import { Heading, Container, Box, Tag, IconButton, UnorderedList, ListItem } from "@chakra-ui/react"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import apiClient from "../apiClient"
import { BsTrash } from "react-icons/bs"

export const Orders = () => {
    const user = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const authHeader = useAuthHeader()
    const [orders, setOrders] = useState([])

    if(!isAuthenticated()){
        return <Navigate to='/login' replace />
    }

    let config = {
        headers: { 
          Authorization: authHeader(),
          'Content-Type': 'application/json' 
        },
        params: {user: user().id}
    }

    useEffect(()=> {
        apiClient.get('/order/', config).then((res) => {
            setOrders(res.data)
        }).catch((error) =>{
            console.log(error)
        })
    }, [])

    const cancelOrder = (id) => {
        let deleteConfig = {...config, params: {id}}
        apiClient.delete('/order/', deleteConfig).then((res) => {
            const deletedOrder = orders.find((order) => order.id === id)
            setOrders(orders.filter(order => order !== deletedOrder))
            
        }).catch((error) =>{
            console.log(error)
        })
    }



    return(
        <Container maxW="7xl" py={5} px={{ base: 5, md: 1 }}>
                <Heading size="sm" as="h3">
                  List of Orders
                </Heading>
          
                <Box mt="6">
                    <Table variant={'striped'} size='sm'>
                        <TableCaption>Showing all your orders</TableCaption>
                        <Thead>
                        <Tr height='50px'>
                            <Th>ID</Th>
                            <Th>Date</Th>
                            <Th>Customer</Th>
                            <Th>Phone Number</Th>
                            <Th>Address</Th>
                            <Th>Order</Th>
                            <Th isNumeric>Total Price</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => {
                            return <Tr height={'75px'}>
                                <Td>{order.id}</Td>
                                <Td>{new Date(order.date).toUTCString()}</Td>
                                <Td>{order.customerFullName}</Td>
                                <Td>{order.customerPhone}</Td>
                                <Td>{order.customerAddress} {order.customerCity}</Td>
                                <Td>
                                    <UnorderedList spacing={2}>
                                    {order.products.map((item) => {
                                        return <ListItem>{item.product.name + ' x' + item.quantity}</ListItem>
                                    })}
                                    </UnorderedList>
                                </Td>
                                <Td isNumeric>{order.totalPrice}€</Td>
                                <Td><Tag size='md' colorScheme={'red'} borderRadius='full'>{order.status.toUpperCase()}</Tag></Td>
                                <Td>
                                    <IconButton aria-label="Cancel order" size={'sm'} colorScheme={'red'} icon={<BsTrash />} onClick={() => cancelOrder(order.id)}/>
                                </Td>
                            </Tr>
                        })}
                    </Tbody>
                    </Table>
                </Box>
        </Container>
    )
}