const { MongoClient } = require('mongodb')
const env = require('dotenv').config()



let dbFuncts = {}
let db;


//the call back will console the error if any
dbFuncts.init = (callback) =>{
    if (db) {
        console.log('Database is already initialized')
        return callback(null, db)

    }
    // console.log("here is connection string", process.env.CONNECTION_STRING + "contacts")
    MongoClient.connect((process.env.CONNECTION_STRING + "contacts"))
        .then((client) => {
            db = client
            callback(null, db)
           //this means the connection was successful and gives "null" as the the parameter for the callback function
            
        })
        .catch((err) => {
            console.log("we got an error", err)
        })
}

dbFuncts.getDb = () => {
    if(!db){
        throw Error('Database is not initialized')
    }
    return db
}

module.exports = dbFuncts