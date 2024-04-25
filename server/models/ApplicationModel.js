const mongoose = require('mongoose');


const ApplicationSchema = new mongoose.Schema({
    job: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Accepted', 'Cancelled', 'Pending'],
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },  
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant'
    },

})

ApplicationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Application', ApplicationSchema);