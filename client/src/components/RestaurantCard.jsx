import { Box, Image, Badge, AspectRatio } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

export const RestaurantCard = ({restaurant}) => {
    return (
      <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <AspectRatio ratio={4/3} boxSize={'350'}>
          <Image src={`http://localhost:3001/${restaurant.image}`} />
        </AspectRatio>
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {restaurant.rating} stars &bull; 
            </Box>
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {restaurant.name}
          </Box>
  
          <Box>
            {restaurant.address}
            <Box as='span' color='gray.600' fontSize='sm'>
               {' ' + restaurant.city}
            </Box>
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < restaurant.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              27 reviews
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }