const { json } = require('body-parser')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan('combined'))

//import product routes
const product = require('./routes/productRoute')
app.use('/api/v1', product)

module.exports = app
