const app = require('./app')

const dotenv = require('dotenv')
const connectDatabase = require('./config/dbConnection')

//congig
dotenv.config({ path: 'Backend/config/config.env' })

//Connection to database
connectDatabase()

app.listen(process.env.PORT, () => {
  console.log(`Server is running in http://localhost:${process.env.PORT}`)
})
