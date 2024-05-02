const express = require('express')
const app = express()
const mongoDb = require('./database/db')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use('/', require('./routes'))


mongoDb.init((err) => {
    if(err) {
        console.log(err)
    }else{
        app.listen(port, () => {console.log("Database is good and app listening on port", port)})
    }
})

