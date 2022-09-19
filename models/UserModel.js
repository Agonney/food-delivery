const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
    },
    date: {
        type: Date,
        default: Date.now
    }

    // Add more fields here
    
})

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = mongoose.model('User', UserSchema);