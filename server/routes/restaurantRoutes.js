const router = require('express').Router();
const Restaurant = require('../models/RestaurantModel')
const authenticateUser = require('../helpers/verifyToken');
const authorize = require('../helpers/authorization')

router.post('/', authenticateUser, authorize('admin'), async (req, res) => {

    if(!req.files){
        res.status(400).send('No image uploaded')
    } else {
        req.files['image'].mv('./uploads/' + req.files['image'].name);
    }


    const restaurant = Restaurant({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        location: {
            lat: req.body.latitude,
            lon: req.body.longitude,
        },
        rating: req.body.rating,
        description: req.body.description,
        image: `./uploads/${req.files['image'].name}`
    })

    const doesExist = await Restaurant.exists({name: restaurant.name})

    try{
        if(!doesExist){
            const newRestaurant = await restaurant.save()
            res.status(201).send(newRestaurant)
        }else {
            res.status(400).send('This restaurant already exists')
        }
        
    }catch(error){
        res.send({message: error})
    }
})

router.get('/:restaurantId', authenticateUser, async(req, res) => {
    const restaurantId = req.params.restaurantId

    const restaurant = await Restaurant.findById(restaurantId)
    if(restaurant){
        res.status(200).send(product)
    }
    else{
        res.status(400).send({message: 'Restaurant not found'})
    }
})

router.get('/', authenticateUser, async(req, res) => {
    const restaurants = await Restaurant.find({})
    if(restaurants){
        res.status(200).send(restaurants)
    }
    else{
        res.status(400).send({message: 'No restaurants found'})
    }
})

module.exports = router