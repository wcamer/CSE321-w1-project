const express = require('express')
const router = express.Router()
const contactsController = require('../controllers/contactsCon')
const val = require('../util/contact-validation')
// const util = require('../util')

router.get('/' ,contactsController.getAll)

router.get('/:id' ,contactsController.getOne)

router.post('/', val.postRules(), val.postFunc, contactsController.create)

router.put('/:id',val.putRules(), val.putFunc, contactsController.update)

router.delete('/:id' , val.deleteRules(), val.deleteFunc, contactsController.deleteOne)



module.exports = router