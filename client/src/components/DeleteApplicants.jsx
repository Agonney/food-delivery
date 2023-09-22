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

export const DeleteApplicants = () => {
    const user = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const authHeader = useAuthHeader()
    const [applicants, setApplicants] = useState([])
    const [selectedApplicant, setSelectedApplicant] = useState('')

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

    const deleteApplicant = async () => {
        const applicantToDelete = applicants.find(applicant => applicant.id === selectedApplicant)
        const deletedApplicant = {
            ...applicantToDelete,
            isDeleted: true,
        }
        apiClient.put('/applicant/', deletedApplicant, config).then((res) => {
            console.log(res)
        }).catch((error) =>{
            console.log(error)
        })
    }





    return(
        <Container maxW="3xl">

        <Box m={'20px auto'} p={4} backgroundColor={'white'} borderRadius={'10px'}>
          <Heading size={'xs'} textAlign={'center'}>Delete Applicants</Heading>
        <Select
                        id="option"
                        name="option"
                        onChange={(e) => setSelectedApplicant(e.target.value)}
                        value={selectedApplicant ? selectedApplicant.id : ''}
                    >
                        <option value="">Select an applicant</option>
                        {applicants.map((applicant) => (
                        <option key={applicant.id} value={applicant.id}>
                             {applicant.id}
                        </option>
                        ))}
                    </Select>
       </Box>
       <Button onClick={() => deleteApplicant()}>Delete</Button>


       </Container>
    )
}