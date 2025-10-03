import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send(`
        <a href="/login">Login</a>
        <a href="/dashboard">Dashboard</a>
    `)
  })

router.get('/login', (req, res) => {
    res.send(`
    <form action="/api/login" method="POST">
        <label for="user">User</label>
        <input name="user" type="text" />
        <label for="password">Password</label>
        <input name="password" type="text" />
        <button type="submit">Submit</button>
    </form>  
    `)
  })

router.get('/dashboard', (req, res) => {
  res.send(`Welcome ${req.session.user}`)
})

export default router