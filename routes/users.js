const express = require('express')
const router = express.Router()

router.use(logger)

router.get('/', (req, res) => {
    console.log(req.query.name)
    res.send("User list")
})

router.get('/new', (req, res) => {
    res.render('users/new', { firstName: 'Test' })
})

const users = [{ name: "Pedro" }, { name: "Lucca" }]

router.post('/', (req, res) => {
    const isValid = false
    if (isValid) {
        users.push({ firstName: req.body.firstName })
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("Error")
        res.render('users/new', { firstName: req.body.firstName })
    }
})

router.get('/:id', (req, res) => {
    console.log(req.user)
    res.send(`Get user id: ${req.params.id}`)
})

router.put('/:id', (req, res) => {
    res.send(`Update user id: ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    res.send(`Delete user with id ${req.params.id}`)
})

router.param('id', (req, res, next, id) => {
    req.user = users[id]
    next()
})

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

module.exports = router