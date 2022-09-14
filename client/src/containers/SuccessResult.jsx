import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router"

export default function SuccessResult() {
    const navigate = useNavigate()

  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Order made
      </Heading>
      <Text color={'gray.500'}>
        Now that you have completed the order, you can go to the Orders' Page and follow its status there.
      </Text>
      <Button mt={10}
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        onClick={() => navigate('/orders')}
        variant="solid">
        Go to Orders
      </Button>
    </Box>
  );
}