const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../services/logger.service')
const fetch = require('node-fetch');
async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('clients')
    const clients = await collection.find(criteria).toArray()
    return clients
  } catch (err) {
    logger.error('cannot get clients', err)
    throw err
  }
}
function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy._id) criteria._id = filterBy._id
  return criteria
}

async function update(client) {
  try {
    const clientToSave = {
      ...client,
      _id: ObjectId(client._id),
    }
    const collection = await dbService.getCollection('clients')
    await collection.updateOne(
      {
        _id: clientToSave._id,
      },
      {
        $set: clientToSave,
      }
    )
    return clientToSave
  } catch (err) {
    logger.error(`cannot update client ${client._id}`, err)
    throw err
  }
}

async function remove(clientId) {
  try {
    const collection = await dbService.getCollection('clients')
    const clientToRemove = {
      _id: ObjectId(clientId),
    }
    await collection.deleteOne(clientToRemove)
  } catch (err) {
    logger.error(`cannot remove client ${clientId}`, err)
    throw err
  }
}

async function add(client) {
  try {
    let re = new RegExp('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')

    if (client && re.test(client.ip_address) ) {
      var clientToSave
      return fetch(`http://ip-api.com/json/${client.ip_address}?fields=country,city`)
      .then(res=> res.json())
      .then(res=> {
        clientToSave = { ...client, ...res }
      }).then(async ()=>{
        const collection = await dbService.getCollection('clients')
        await collection.insertOne(clientToSave)
        return clientToSave
      })

    }
    const collection = await dbService.getCollection('clients')
    await collection.insertOne(client)
    return client
  } catch (err) {
    logger.error('cannot insert client', err)
    throw err
  } 
}

module.exports = {
  query,
  update,
  remove,
  add,
}
