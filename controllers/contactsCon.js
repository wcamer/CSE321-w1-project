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
    console.log("here is collection....\n",contacts)
}

module.exports = {getAll}


