const express = require('express')
const router = express.Router()
const contactsController = require('../controllers/contactsCon')

router.get('/' ,contactsController.getAll)

router.get('/:id' ,contactsController.getOne)

router.post('/', contactsController.create)

router.put('/:id', contactsController.update)

router.delete('/:id' , contactsController.deleteOne)



module.exports = router