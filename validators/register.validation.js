const { check } = require('express-validator')

 module.exports = [
    check('name').matches(/^[a-z ,.'-]+$/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            return false;
        }
        return true;
    })
]