const app = require('express').Router()
const { validationResult } = require('express-validator')
const validation = require('../validators/register.validation')
const usermodel = require('../moduls/user.module');
const bcrypt = require('bcrypt');
const authLogin = require('../middleware/authLogin');

app.get('/', authLogin, (req, res) => {

    res.render('Register', { errors: req.flash('errors'), oldInputs: req.flash('oldInputs'), exists: req.flash('exists'), mysession: req.session.MyID })
})

app.post('/handleSignUp', validation, async (req, res) => {
    const { name, email, password } = req.body
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        let user = await usermodel.findOne({ email })
        if (user) {
            // exists
            req.flash('exists', true)
            res.redirect('/')
        } else {
            bcrypt.hash(password, 7, async function (err, hash) {
                await usermodel.insertMany({ name, email, password: hash })
                res.redirect('login')
            });
        }
    } else {
        req.flash('oldInputs', { name, email, password })
        req.flash('errors', errors.array())
        res.redirect('/')
    }
})



module.exports = app