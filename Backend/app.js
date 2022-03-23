const { json } = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))

//import product routes
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)

module.exports = app
