import React from 'react'
import apiClient from '../apiClient'
import {useAuthHeader, useAuthUser} from 'react-auth-kit'
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { ProductGrid } from '../components/ProductGrid'


export const Items = () => {
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
        console.log(products)
      }).catch((error) => {
        console.log(error)
      })
    }, [])
  
    console.log(products)

    return(
      <Box
        maxW="7xl"
        mx="auto"
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
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </Box>
    )
}