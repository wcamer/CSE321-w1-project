const mongoDb = require('../database/db')


const getAll = async (req,res) =>{
    const collection = await mongoDb.getDb().db().collection('contacts').find()
    // console.log("here is collection....\n", await collection.toArray())
    // collection.toArray().then((contacts) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(contacts)
    // })


    const contacts = await collection.toArray()
    res.setHeader('Content-Type', 'application/json');
    res.json(contacts)
    // console.log("here is collection....\n",contacts)
}


const mongodbObjectId = require('mongodb').ObjectId
const getOne = async (req,res) =>{
    const id = new mongodbObjectId(req.params.id)
    // console.log("here is req.params",req.params)
    // console.log("here is the req.parms.id",req.params.id)
    const collection = await mongoDb.getDb().db().collection('contacts').find({_id: id})
    const singleContact = await collection.toArray()

    res.setHeader('Content-Type', 'application/json')
    res.json(singleContact[0])
    // console.log("here is single contact....\n",singleContact)
}

module.exports = {getAll, getOne}


