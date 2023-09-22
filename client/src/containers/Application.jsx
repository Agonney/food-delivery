import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
  } from '@chakra-ui/react';
import { AddApplicant } from '../components/AddApplicant';
import { AddApplication } from '../components/AddApplication';
import { ShowApplications } from '../components/ShowApplications';
import { DeleteApplicants } from '../components/DeleteApplicants';
import { ShowApplicationsFromApplicant } from '../components/ShowApplicationsFromApplicant';

export default function Application() {
    return(
        <Container maxW={'5xl'} py={12}>
            <AddApplicant />
            <AddApplication />
            <ShowApplications />
            <DeleteApplicants />
            <ShowApplicationsFromApplicant />
        </Container>
    )
}