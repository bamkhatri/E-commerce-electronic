const app = require('./app')

const dotenv = require('dotenv')
const cloudinary = require('cloudinary')
const connectDatabase = require('./config/dbConnection')
const errorMiddleware = require('./Middleware/error')

// Handling uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error:${err}`)
  console.log('Shutting down server deu to uncaught Exception')
  process.exit(1)
})

//congig
dotenv.config({ path: 'Backend/config/config.env' })

//Connection to database
connectDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
})

//Middleware
app.use(errorMiddleware)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running in http://localhost:${process.env.PORT}`)
})

//Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error:${err}`)
  console.log('Shutting down server deu to unhandled Pormise Rejection')
  server.close(() => {
    process.exit(1)
  })
})
