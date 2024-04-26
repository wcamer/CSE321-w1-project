const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {


    res.send("'hello big world")
})

router.use('/contacts' , require('./contactsRoute'))

module.exports = router