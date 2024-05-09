const express = require('express')
const app = express()
const mongoDb = require('./database/db')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
// app.use('/', require('./routes'))0
app.use((req,res,next) => {
    // res.setHeader("Acess-Control-Allow-Origin", "*")
    // res.setHeader("Acess-Control-Allow-Headers",
    //         "Origin, X-Requested-With, Content-Type, Accept, Z-key")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next();
})

app.use('/', require('./routes'))

mongoDb.init((err) => {
    if(err) {
        console.log(err)
    }else{
        app.listen(port, () => {console.log("Database is good and app listening on port", port)})
    }
})

