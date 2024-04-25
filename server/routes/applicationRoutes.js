const router = require('express').Router();
const Application = require('../models/ApplicationModel')
const authenticateUser = require('../helpers/verifyToken');

router.post('/', authenticateUser, async (req, res) => {

    const application = Application({
        job: req.body.job,
        education: req.body.education,
        status: req.body.status,
        isDeleted: false,
        applicant: req.body.applicantId
    })

    try{
        const newApplication = await application.save()
        res.status(201).send(newApplication)
    }catch(error){
        res.send({message: error})
    }
})

router.get('/:id', authenticateUser, async(req, res) => {
    var id = req.params.id

    const application = await Application.find({id})
    if(applicant){
        res.status(200).send(application)
    }
    else{
        res.status(400).send({message: 'Application with this id not found'})
    }
})

router.get('/', authenticateUser, async(req, res) => {
    let status = req.query.status
    let applications

    if(status){
        applications = await Application.find({status: status}).populate(['applicant'])
    }else{
        applications = await Application.find({}).populate(['applicant'])
    }

    if(applications){
        res.status(200).send(applications)
    }
    else{
        res.status(400).send({message: 'No applications found'})
    }
})

router.put('/', authenticateUser, async(req, res) => {
    let applicationId = req.query.id

    const application = await Application.findByIdAndUpdate(applicationId, req.body)

    if(application){
        res.status(200).send(application)
    }
    else{
        res.status(400).send({message: 'No application with this ID found'})
    }
})

module.exports = router