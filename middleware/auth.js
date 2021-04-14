module.exports = (req,res,next)=>{
    if (req.session.MyID) {
        next()
    }else{
        res.redirect('/login')
    }
}
