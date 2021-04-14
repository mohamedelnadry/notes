module.exports = (req, res, next) => {
    if (req.session.MyID) {
        res.redirect('/home')
    } else {
        next()
    }
}
