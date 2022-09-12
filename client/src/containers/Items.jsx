import React from 'react'
import apiClient from '../apiClient'
import {useAuthHeader, useIsAuthenticated} from 'react-auth-kit'
import { Box, Heading, HStack, Text, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { ProductGrid } from '../components/ProductGrid'
import { Navigate } from 'react-router-dom'


export const Items = () => {
    const isAuthenticated = useIsAuthenticated()
    if(!isAuthenticated()){
        return <Navigate to='/login' replace />
    }

    const authHeader = useAuthHeader()
    const [products, setProducts] = useState([])

    const config = {
      headers: { 
        Authorization: authHeader(),
        'Content-Type': 'application/json' 
      }
    }

    

    useEffect(() => {
      apiClient.get('/product', config).then((res) => {
        setProducts(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }, [])
  
    const onSortChange = (e) => {
      const sort = e.target.value
      const copyProducts = [...products]

      copyProducts.sort((a, b) => {
        return sort === 'low' ? a.price - b.price : b.price - a.price
      })
      setProducts(copyProducts)
    }

    return(
      <Box maxW="7xl" mx="auto"
        px={{
          base: '4',
          md: '8',
          lg: '12',
        }}
        py={{
          base: '6',
          md: '8',
          lg: '12',
        }}
    >
      <HStack marginBottom={20} justifyContent={'space-between'}>
        <Heading>Items</Heading>
        <HStack >
          <Text noOfLines={1} width={'20'}>Sort by</Text>
          <Select placeholder='Select an option' onChange={onSortChange}>
              <option value='low'>Price: Low to High</option>
              <option value='high'>Price: High to Low</option>
          </Select>
        </HStack>
      </HStack>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </Box>
    )
}