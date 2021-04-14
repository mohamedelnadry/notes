const { check } = require('express-validator')

 module.exports = [
    check('email').isEmail(),
    check('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
]