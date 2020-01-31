const express = require('express')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path')
const app = express() 

const port = 5000

const database = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'supersecretpassword',
    database: 'soccer'
})

database.connect((err) => {
    if (err) {
     throw err
    }   
    console.log('connected to database')

})

global.db = database

app.set('port', process.env.port || port)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(fileupload())

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
})