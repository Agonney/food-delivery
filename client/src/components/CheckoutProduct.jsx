import { Box, AspectRatio, Image, Skeleton, HStack, useBreakpointValue, 
        Text, Divider, VStack, Select, Button } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, addPrice } from '../state/cartReducer';
import { useState } from "react";
import { usePrevious } from "@chakra-ui/react";

export const CheckoutProduct = ({product}) => {

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const [currentValue, setCurrentValue] = useState(1)
    const [totalProductPrice, setTotalProductPrice] = useState(product.price)
    console.log(cart)

    const onQuantitySelect = (e) => {
        setCurrentValue(e.target.value)
        const price = product.price * e.target.value
        setTotalProductPrice(price)
        const id = product.id
        dispatch(addPrice({id, price}))
        // dispatch(removePrice(priceToRemove))
    }

    return(
        <VStack spacing={6} w='100%'>    
            <HStack
            spacing={8}
            justifyContent='space-between'
            w='100%'
        >
            <HStack spacing={8}>
                <Box position="relative">
                    <AspectRatio ratio={4 / 3} h='100px' w='100px'>
                        <Image
                        src={`http://localhost:3001/${product?.image}`}
                        alt={name}
                        draggable="false"
                        fallback={<Skeleton />}
                        borderRadius={useBreakpointValue({
                            base: 'md',
                            md: 'xl',
                        })}
                        />
                        
                    </AspectRatio>
                </Box>

                <VStack spacing={9} alignItems={'start'}>
                    <Text fontWeight='semibold' fontSize={16}>{product?.name}</Text>
                    <Select bgColor={'white'} value={currentValue} onChange={onQuantitySelect}>
                        {[1,2,3,4,5,6,7,8,9,10].map((i) => {
                            return <option key={i} value={i}>{i}</option>
                        })}
                    </Select>
                </VStack>
            </HStack>
           
            <VStack justifyContent='space-between' h='100%'>
                <Text alignSelf='end' fontWeight='semibold' fontSize={16} >€{Math.round(totalProductPrice * 100) / 100}</Text>
                <Button size={'xs'} onClick={() => dispatch(removeItem(product))}>Remove</Button>
            </VStack>
            
        </HStack>
            <Divider/>
        </VStack>
        
        
    )
}