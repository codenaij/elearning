import fs from 'fs'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const morgan = require('morgan')

require('dotenv').config()

const app = express()

// db
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose
  .connect(DB, DB_OPTIONS)
  .then(() => console.log('DB Connected'))
  .catch((err) => {
    console.log('DB CONNECTION ERROR =>', err)
  })

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// route
fs.readdirSync('./routes').map((r) =>
  app.use('/api/v1', require(`./routes/${r}`))
)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`)
})
