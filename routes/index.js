const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {

    res.send("Hello big world")
})


router.use('/contacts' , require('./contactsRoute'))

module.exports = router