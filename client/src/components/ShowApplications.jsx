import { useAuthUser, useIsAuthenticated, useAuthHeader } from "react-auth-kit"
import { Navigate } from "react-router"
import { Heading, Container, Box, Select, Button, UnorderedList, ListItem } from "@chakra-ui/react"
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

export const ShowApplications = () => {
    const user = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const authHeader = useAuthHeader()
    const [applications, setApplications] = useState([])
    const [selectedStaus, setSelectedStatus] = useState('')

    let config = {
        headers: { 
          Authorization: authHeader(),
          'Content-Type': 'application/json' 
        },
        params: {status: selectedStaus}
    }

    console.log(selectedStaus)

    const getApplications = async () => {
        apiClient.get('/application/', config).then((res) => {
            setApplications(res.data)
        }).catch((error) =>{
            console.log(error)
        })
    }

    console.log(applications)

    // useEffect(()=> {
    //     apiClient.get('/application/', config).then((res) => {
    //         setApplications(res.data)
    //     }).catch((error) =>{
    //         console.log(error)
    //     })
    // }, [])




    return(
        <Container maxW="3xl">

        <Box m={'20px auto'} p={4} backgroundColor={'white'} borderRadius={'10px'}>
          <Heading size={'xs'} textAlign={'center'}>Show applications based on status</Heading>
        <Select id="status" placeholder="Select status" onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="Accepted">Accepted</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Pending">Pending</option>
        </Select>
       </Box>
       <Button onClick={() => getApplications()}>GET</Button>


       {applications?.filter(application => application.isDeleted === false).map((application) => {
        return <Box>
            {application.job} {application.education} {application.status}
        </Box>
       })}
       </Container>
    )
}