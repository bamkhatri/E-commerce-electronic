const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

//import product routes
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)

module.exports = app
