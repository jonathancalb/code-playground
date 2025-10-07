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
  if (req.session.user) {
    res.send(`
      Welcome ${req.session.user}
    
      <form action="/api/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    `)
  } else {
    res.redirect('/login')
  }
})

export default router