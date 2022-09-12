const router = require('express').Router();
const Order = require('../models/OrderModel')
const authenticateUser = require('./verifyToken');

router.post('/', authenticateUser, async (req, res) => {

    const order = Order({
        customerFullName: req.body.values.name,
        customerAddress: req.body.values.streetAddress,
        customerCity: req.body.values.city,
        paymentMethod: req.body.paymentMethod,
        totalPrice: req.body.totalPrice,
        products: req.body.productQuantity,
        customer: req.body.userId
    })

    try{
        const newOrder = await order.save()
        res.status(201).send(newOrder)
    }catch(error){
        res.send({message: error})
    }
})

router.get('/:id', authenticateUser, async(req, res) => {
    var id = req.params.id

    const order = await Order.find({id})
    if(order){
        res.status(200).send(order)
    }
    else{
        res.status(400).send({message: 'Order with this id not found'})
    }
})

router.get('/', authenticateUser, async(req, res) => {

    const orders = await Order.find({}).populate(['customer', 'products.product'])
    if(orders){
        res.status(200).send(orders)
    }
    else{
        res.status(400).send({message: 'No orders found'})
    }
})


module.exports = router