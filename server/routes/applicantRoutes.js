const router = require('express').Router();
const Applicant = require('../models/ApplicantModel')
const authenticateUser = require('../helpers/verifyToken');

router.post('/', authenticateUser, async (req, res) => {

    const applicant = Applicant({
        name: req.body.name,
        isActive: req.body.isActive,
        isDeleted: false,
    })

    try{
        const newApplicant = await applicant.save()
        res.status(201).send(newApplicant)
    }catch(error){
        res.send({message: error})
    }
})

router.get('/:id', authenticateUser, async(req, res) => {
    var id = req.params.id

    const applicant = await Applicant.find({id})
    if(applicant){
        res.status(200).send(applicant)
    }
    else{
        res.status(400).send({message: 'Applicant with this id not found'})
    }
})

router.get('/', authenticateUser, async(req, res) => {
    let applicants = await Applicant.find({})

    if(applicants){
        res.status(200).send(applicants)
    }
    else{
        res.status(400).send({message: 'No applicants found'})
    }
})

router.put('/', authenticateUser, async(req, res) => {
    let applicantId = req.body.id
    console.log(req.body)

    const applicant = await Applicant.findByIdAndUpdate(applicantId, req.body)

    if(applicant){
        res.status(200).send(applicant)
    }
    else{
        res.status(400).send({message: 'No applicant with this ID found'})
    }
})

module.exports = router