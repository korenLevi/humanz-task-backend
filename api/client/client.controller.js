const logger = require('../../services/logger.service')
const clientService = require('./client.service')
async function getClients(req, res) {
	// 3035
    try {
        const filterBy = req.query
        const clients = await clientService.query(filterBy)
        res.send(clients)
    } catch (error) {
        logger.error('Cannot get clients', error)
        res.status(500).send({ error: 'Failed to get clients' })
    }
}

async function updateClient(req,res) {
	try{
		const client = req.body
		const savedClient = await clientService.update(client)
		res.send(savedClient)
	}catch(error){
		logger.error('Failed to update client', error)
        res.status(500).send({ error: 'Failed to update client' })
	}
}

async function removeClient(req, res) {
    try {
        await clientService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete client', err)
        res.status(500).send({ err: 'Failed to delete client' })
    }
}

async function addClient(req, res) {
    try {
        const client = await clientService.add(req.body)
        res.send(client)
    } catch (err) {
        logger.error('Failed to add client', err)
        res.status(500).send({ err: 'Failed to add client' })
    }
}

module.exports = {
	getClients,
	updateClient,
	removeClient,
	addClient
}












