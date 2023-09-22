const mongoose = require('mongoose');


const ApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },  
    isDeleted: {
        type: Boolean,
        required: true,
    },  
})

ApplicantSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Applicant', ApplicantSchema);