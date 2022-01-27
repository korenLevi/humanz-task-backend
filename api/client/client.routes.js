const express = require('express')
const {getClients,updateClient,removeClient,addClient} = require('./client.controller')
const router = express.Router()

router.get('/', getClients)
router.put('/:id', updateClient)
router.post('/', addClient)
router.delete('/:id',  removeClient)

module.exports = router
