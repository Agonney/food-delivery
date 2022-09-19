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
import { BiRestaurant } from 'react-icons/bi';
import { TbTruckDelivery } from 'react-icons/tb'
import { IoFastFoodOutline } from 'react-icons/io5'
import { MapChart } from '../components/MapChart';
  
  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };
  
  export default function AboutUs() {
    return (
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
              Our Story
            </Text>
            <Heading>Your place for food</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
            HaShpejt is a Professional eCommerce Platform. Here we will provide you only interesting content, which you will like very much. 
            We're dedicated to providing you the best of eCommerce, with a focus on dependability and Food ordering and delivery.
             We're working to turn our passion for eCommerce into a booming online website. </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>
              <Feature
                icon={
                  <Icon as={BiRestaurant} color={'yellow.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={'Explore restaurants'}
              />
              <Feature
                icon={<Icon as={IoFastFoodOutline} color={'green.500'} w={5} h={5} />}
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={'Order food'}
              />
              <Feature
                icon={
                  <Icon as={TbTruckDelivery} color={'purple.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Express Delivery'}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'}
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>

        <MapChart />
      </Container>
    );
  }