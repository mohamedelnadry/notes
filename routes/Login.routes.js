const app = require('express').Router();
const { validationResult } = require('express-validator');
const validation = require('../validators/login.validation');
const usermodel = require('../moduls/user.module')
const bcrypt = require('bcrypt');
const authLogin = require('../middleware/authLogin');
var hour = 3600000




app.get('/login', authLogin, (req, res) => {
    res.render('Login', { errors: req.flash('errors'), oldInputs: req.flash('oldInputs'), myemail: req.flash('myemail'), mypassword: req.flash('mypassword'), mysession: req.session.MyID })
})

app.post('/handleSignin', validation, async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const data = await usermodel.findOne({ email })
        if (data) {
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                req.session.MyID = data._id
                req.session.MyName = data.name
                req.session.cookie.expires = new Date(Date.now() + hour)
                req.session.cookie.maxAge = hour
                res.redirect('/home')
            } else {
                req.flash('oldInputs', { email, password })
                req.flash('mypassword', true)
                res.redirect('/login')
            }
        } else {
            req.flash('oldInputs', { email, password })

            req.flash('myemail', true)
            res.redirect('/login')
        }
    } else {
        req.flash('oldInputs', { email, password })
        req.flash('errors', errors.array())
        res.redirect('/login')
    }

})
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})



module.exports = app