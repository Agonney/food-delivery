import React from 'react'
import { Menu, MenuButton, Tag, Icon, TagLabel, MenuItem, MenuList, Image, MenuDivider, Button, Flex } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../state/cartReducer';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const ShoppingCart = () => {
    const cartItems = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Tag size='lg' colorScheme='blue' borderRadius='full'>
                <Icon as={AiOutlineShoppingCart} h={'7'} w={'7'} marginRight={2}/>
                <TagLabel>{cartItems.length}</TagLabel>
            </Tag>
            </MenuButton>
            <MenuList>
            {cartItems.map((item, i) => {
                return <MenuItem key={i} justifyContent='space-between'>
                    <Image
                    boxSize='2rem'
                    borderRadius='md'
                    src={`http://localhost:3001/${item.image}`}
                    alt='N/A'
                    mr='12px'
                    />
                    {item.name}
                    <Button size={'xs'} onClick={() => dispatch(removeItem(item))}>X</Button>
                </MenuItem>
            })}
            <MenuDivider />
            <Flex direction={'row'} justifyContent={'flex-end'} marginRight={3}>
                <Button background={'lightblue'} onClick={() => navigate('/checkout')}>Checkout</Button>
            </Flex>
            </MenuList>
        </Menu>
    )
}

