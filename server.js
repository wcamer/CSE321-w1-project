const express = require('express')
const app = express()
const mongoDb = require('./database/db')

const port = process.env.PORT || 3000;

app.use('/', require('./routes'))


mongoDb.init((err) => {
    if(err) {
        console.log(err)
    }else{
        app.listen(port, () => {console.log("Listening on port", port)})
    }
})

