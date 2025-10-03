import express from 'express'

const router = express.Router()

router.post('/login', (req, res) => {
    const { user, password } = req.body
    req.session.user = user
    res.redirect('/dashboard')
})

  export default router