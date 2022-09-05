import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Image,
    Link,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { Rating } from './Rating'
  import { FavouriteButton } from './FavoriteButton'
  import { PriceTag } from './PriceTag'
  
  
  export const ProductCard = (props) => {
    const { product, rootProps } = props
    const { name, image, price, salePrice, rating } = product
    return (
      <Stack
        spacing={useBreakpointValue({
          base: '4',
          md: '5',
        })}
        {...rootProps}
      >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={`http://localhost:3001/${image}`}
              alt={name}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({
                base: 'md',
                md: 'xl',
              })}
              _hover={{
                transform: 'scale(1.1)'
              }}
              transition={'ease-out 0.3s'}
            />
          </AspectRatio>
          <FavouriteButton
            position="absolute"
            top="4"
            right="4"
            aria-label={`Add ${name} to your favourites`}
          />
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
              {name}
            </Text>
            <PriceTag price={price} salePrice={salePrice} currency="EUR" />
          </Stack>
          <HStack>
            <Rating defaultValue={4.5} size="sm" />
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              12 Reviews
            </Text>
          </HStack>
        </Stack>
        <Stack align="center">
          <Button colorScheme="blue" width="full">
            Add to cart
          </Button>
        </Stack>
      </Stack>
    )
  }