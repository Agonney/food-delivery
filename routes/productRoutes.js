const router = require('express').Router();
const Product = require('../models/ProductModel')
const authenticateUser = require('./verifyToken');

router.post('/', authenticateUser, async (req, res) => {

    if(!req.files){
        res.status(400).send('No image uploaded')
    } else {
        req.files['image'].mv('./uploads/' + req.files['image'].name);
    }


    const product = Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: `./uploads/${req.files['image'].name}`
    })

    try{
        const newProduct = await product.save()
        res.status(201).send(newProduct)
    }catch(error){
        res.send({message: error})
    }
})

router.get('/', authenticateUser, async(req, res) => {
    const products = await Product.find({})
    if(products){
        res.status(200).send(products)
    }
    else{
        res.status(400).send({message: 'No products found'})
    }
})

module.exports = router