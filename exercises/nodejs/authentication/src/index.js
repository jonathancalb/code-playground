import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import apiRouter from './api/index.js'
import webappRouter from './webapp/index.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  ...(process.env.NODE_ENV === 'production' && 
    {
      cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24
      }
    })
}))

app.use('/api', apiRouter)
app.use('/', webappRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

export default app