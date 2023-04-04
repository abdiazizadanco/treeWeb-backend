const { Router } = require('express')
const router = Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google', {
    scope:['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('You reached redirect cb function')
})

module.exports = router