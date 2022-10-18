import express from 'express'
// import mongoose from 'mongoose'
import { PORT } from './config'
import router from './router'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

if (isProd()) {
  app.use(
    express.static(path.join(__dirname, '../../false-bottom-frontend/dist'))
  )
}

app.use('/api/v1', router)

if (isProd()) {
  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../../false-bottom-frontend/dist/index.html')
    )
  })
}

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => {
      console.log(`server started: http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

startApp()