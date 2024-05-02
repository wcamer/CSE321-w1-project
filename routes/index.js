const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router.get('/', (req,res) => {

    res.send("Hello big world")
})


router.use('/contacts' , require('./contactsRoute'))

module.exports = router