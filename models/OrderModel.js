const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    customerFullName: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },  
    customerCity: {
        type: String,
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: mongoose.Schema.Types.Number,
                default: 1
            }
        }
    ],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

OrderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Order', OrderSchema);