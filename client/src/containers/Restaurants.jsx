import {useIsAuthenticated, useAuthHeader, useAuthUser} from 'react-auth-kit'
import { Divider, Box,  Heading, VStack, Button } from "@chakra-ui/react";
import { Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import { RestaurantCard } from '../components/RestaurantCard';
import { ProductGrid } from '../components/ProductGrid'
import apiClient from '../apiClient';
import GoogleMapReact from 'google-map-react';
import { Marker } from '../components/Marker';


export const Restaurants = () => {
    const isAuthenticated = useIsAuthenticated()
    if(!isAuthenticated()){
        return <Navigate to='/login' replace />
    }

    const authHeader = useAuthHeader()
    const [restaurants, setRestaurants] = useState([])

    const defaultMapProps = 
        {
            center: {
                lat: 42.659458861711435,
                lng: 21.160594701099516
            },
            zoom: 15
        }

    const config = {
      headers: { 
        Authorization: authHeader(),
        'Content-Type': 'application/json' 
      }
    }


    useEffect(() => {
        apiClient.get('/restaurant', config).then((res) => {
          let newRestaurants = []
            for(let restaurant of res.data){
                const newRestaurant = {
                    ...restaurant,
                    show: false
                }
                newRestaurants.push(newRestaurant)
            }
            setRestaurants(newRestaurants)
        }).catch((error) => {
          console.log(error)
        })
    }, [])


    const onChildMouseEnterLeaveCallback = (key) => {
        const restaurant = restaurants[key]
        const newRestaurant = {...restaurant, show: !restaurant.show}
        setRestaurants(restaurants.map(r => r.id === restaurants[key].id ? newRestaurant : r))
    }
  
    return (
      <Box maxW="8xl" mx="auto"
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
        <VStack spacing={10}>
            <Heading size={'md'} color={'blue.500'}>Find the restaurants in the interactive map</Heading>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyC0pojWLcmROeWe24W3tuKjunznrDTHdYk" }}
                        defaultCenter={defaultMapProps.center}
                        defaultZoom={defaultMapProps.zoom}
                        onChildMouseEnter={onChildMouseEnterLeaveCallback}
                        onChildMouseLeave={onChildMouseEnterLeaveCallback}
                >
                        {restaurants.map((restaurant) => (
                            <Marker lat={restaurant.location.lat} lng={restaurant.location.lon} show={restaurant.show} restaurant={restaurant} />
                        ))}
                </GoogleMapReact>
            </div>

            <Divider borderWidth={1} />

            <Heading size={'md'} color={'blue.500'}>See all restaurants</Heading>
            <ProductGrid>
                    {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
            </ProductGrid>
        </VStack>
        
    </Box>
    );
}