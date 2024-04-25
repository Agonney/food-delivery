const router = require('express').Router();
const Review = require('../models/ReviewModel')
const authenticateUser = require('../helpers/verifyToken');
const querystring = require('querystring');

router.post('/', authenticateUser, async (req, res) => {

    const review = Review({
        rating: req.body.rating,
        description: req.body.description ?? '',
        product: req.body.productId,
        customer: req.body.customerId,
        restaurant: req.body.restaurantId
    })

    try{
        const newReview = await review.save()
        res.status(201).send(newReview)
    }catch(error){
        res.send({message: error})
    }
})

router.get('/:id', authenticateUser, async(req, res) => {
    var id = req.params.id

    const review = await Review.find({id})
    if(review){
        res.status(200).send(order)
    }
    else{
        res.status(400).send({message: 'Review with this id not found'})
    }
})

router.get('/', authenticateUser, async(req, res) => {

    let productId = req.query.productId
    let reviews
    reviews = await Review.find({ product: productId}).populate(['customer', 'product', 'restaurant'])

    // if(user){
    //     reviews = await Review.find({customer: user}).populate(['customer', 'product', 'restaurant'])
    // }else{
    //     reviews = await Review.find({}).populate(['customer', 'product', 'restaurant'])
    // }

    if(reviews){
        res.status(200).send(reviews)
    }
    else{
        res.status(400).send({message: 'No reviews found'})
    }
})

router.put('/', authenticateUser, async(req, res) => {
    let reviewId = req.query.id

    const review = await Review.findByIdAndUpdate(reviewId, req.body)

    if(review){
        res.status(200).send(review)
    }
    else{
        res.status(400).send({message: 'No review with this ID found'})
    }
})


router.delete('/', authenticateUser, async(req, res) => {

    let reviewId = req.query.id

    const review = await Review.findByIdAndDelete(reviewId)
    if(review){
        res.status(204).send(review)
    }
    else{
        res.status(400).send({message: 'No review with this ID found'})
    }
})


module.exports = router