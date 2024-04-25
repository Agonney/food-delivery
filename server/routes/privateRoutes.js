const router = require('express').Router();
const authenticateUser = require('../helpers/verifyToken');
const authorize = require('../helpers/authorization')

// using authenticateUser as a midddleware for validation
router.get('/', authenticateUser, authorize('user'), (req, res) => {
    res.send(req.user)
})


module.exports = router