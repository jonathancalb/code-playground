import express from 'express'
import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

router.post('/login', async (req, res) => {
    const { user, password } = req.body

    const currDir = dirname(fileURLToPath(import.meta.url))
    const dbPath = join(currDir, 'users.json')

    const stringData = await readFile(dbPath)
    const data = JSON.parse(stringData)
    console.log(data.users)

    const userFound = data.find(dbUser => dbUser.name === user)

    if (userFound && userFound.password === password) {
      req.session.user = user
      res.redirect('/dashboard')
    } else {
      res.redirect('/login?error=invalid')
    }
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.redirect('/')
  })
})

  export default router