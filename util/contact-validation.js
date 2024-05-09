
const {body, validationResult} = require('express-validator')
const mongoDb = require('../database/db')
const mongodbObjectId = require('mongodb').ObjectId
const val = {}


val.getAllRules = () => {

}

val.postRules = () => {
    return [
        body("firstName")
            .trim()
            
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Please provide a first name with at least 1 letter"),

        body("lastName")
        .trim()
        
        .notEmpty()
        .isLength({ min: 1})
        .withMessage("Please provide a last name with at least 1 letter"),

        body("email")
        .trim()
        
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .isLength({ min: 1})
        .withMessage("Please provide a valid email"),

        body("favoriteColor")
            .trim()
            
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Please provide a color with at least 1 letter"),

        body("birthday")
        .trim()
        .notEmpty()
       
        //.isDate()
        .withMessage("Please provide a birthday in the following format yyyy-mm-dd"),


    ]

}

val.postFunc = async (req,res,next) => {
    const {firstName, lastName, email, favoriteColor, birthday} = req.body
    let errors = []
    console.log("here is bday",birthday, validationResult(req))
    errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({message: errors})
        console.log("didn't pass the postfunc rules ")
        return
    }else{
        console.log("it passed the pstFunc rules")
    }
    next()
}

val.putRules = () => {

    return [
        body("firstName")
            .trim()
            
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Please provide a first name with at least 1 letter"),

        body("lastName")
        .trim()
        
        .notEmpty()
        .isLength({ min: 1})
        .withMessage("Please provide a last name with at least 1 letter"),

        body("email")
        .trim()
        
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .isLength({ min: 1})
        .withMessage("Please provide a valid email"),

        body("favoriteColor")
            .trim()
            
            .notEmpty()
            .isLength({ min: 1})
            .withMessage("Please provide a color with at least 1 letter"),

        body("birthday")
        .trim()
        
        .notEmpty()
        .isLength({ min: 1})
        // .isDate()
        .withMessage("Please provide a birthday in the following format yyyy-mm-dd"),


    ]
}

val.putFunc = async (req,res,next) => {
    const {firstName, lastName, email, favoriteColor, birthday} = req.body
    let errors = []
    errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({message: errors})
        return
    }else{
        console.log("it past the putFunct rules")
    }
    next()
}

val.deleteRules =  () =>{
    return [
        body("_id")
            .custom( async (req, res) =>{
                 
                    const id = new mongodbObjectId(req.params.id)
                    const collection = await mongoDb.getDb().db().collection('contacts').find({_id: id})
                    const singleContact = await collection.toArray()
                    if (singleContact.length == 1){
                        console.log("The contact exists and proceeding to deletion")
                    }else{
                        throw new Error("There was an error in finding the id to delete in the DB")
                    }
                
            })

        


    ]
}

val.deleteFunc = async (req,res,next) => {
    const {id} = req.body
    let errors = []
    errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({message: errors})
        return
    }else{
        console.log("it passed the delete rules")
    }
    next()
}

module.exports = val 