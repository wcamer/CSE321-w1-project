const mongoDb = require('../database/db')
const mongodbObjectId = require('mongodb').ObjectId


const getAll = async (req,res) =>{
    const collection = await mongoDb.getDb().db().collection('contacts').find().toArray((error, lists) => {
        if (error){
            res.status(400).json({message: error})
        }
        return lists
    })

   console.log("here is collection", collection)
    res.setHeader("Content-Type", "application/json")
    res.json(collection)

    // console.log("here is collection....\n", await collection.toArray())
    // collection.toArray().then((contacts) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(contacts)
    // })


    // const contacts = await collection.toArray()
    // res.setHeader('Content-Type', 'application/json');
    // res.json(contacts)
    // console.log("here is collection....\n",contacts)
}


// const mongodbObjectId = require('mongodb').ObjectId
const getOne = async (req,res) =>{
    // const id = new mongodbObjectId(req.params.id)
    // // console.log("here is req.params",req.params)
    // // console.log("here is the req.parms.id",req.params.id)
    // const collection = await mongoDb.getDb().db().collection('contacts').find({_id: id})
    // const singleContact = await collection.toArray()

    // const len = singleContact.length
    // console.log("here is len",len)

    // res.setHeader('Content-Type', 'application/json')
    // res.json(singleContact[0])

    //week 3 update
    const id = new mongodbObjectId(req.params.id)
    // console.log("here is req.params",req.params)
    // console.log("here is the req.parms.id",req.params.id)
    const collection = await mongoDb.getDb().db().collection('contacts').find({_id: id}).toArray((error, list) =>{
        if(error){
            res.status(400).json({message: error})
        }
        return list
    })
    
    res.setHeader('Content-Type', 'application/json')
    res.json(collection)


}


const create = async (req,res) =>{
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    
    }

    
    const db = await mongoDb.getDb().db().collection('contacts').insertOne(newContact)
    if (db.acknowledged){
        res.status(200).send(`${newContact.firstName} contact has been created`)

    }else{
        res.status(500).json(db.error || "Error in 'contact creation' operation")
    }


}

const update = async (req, res) =>{
    const id = new mongodbObjectId(req.params.id)
    const contactInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    const db = await mongoDb.getDb().db().collection('contacts').replaceOne({_id: id}, contactInfo)
    if (db.modifiedCount > 0){
        res.status(200).send("Update was successful!!!")

    }else{
        res.status(500).json(db.error || "Error during 'contact update' operation")
    }
}

const deleteOne = async (req, res) =>{
    const id = new mongodbObjectId(req.params.id)
    const db = await mongoDb.getDb().db().collection('contacts').deleteOne({_id: id})
    if (db.deletedCount > 0){
        res.status(200).send("Deletion was successful!!!")
    }else{
        res.status(500).json(db.error || "Error during 'delete one contact' operation")
    }
}


module.exports = {getAll, getOne, create, update, deleteOne}


