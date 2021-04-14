const app = require('express').Router()
const auth = require('../middleware/auth');
const postmodel = require('../moduls/post.module');
const Posts = require('../moduls/post.module')


app.get('/home', auth,async(req, res) => {
    const data = await Posts.find({user_id:req.session.MyID}).populate('user_id','name email -_id')
    res.render('Home', { mysession: req.session.MyID, posts:data })
    // res.json(data)
})

app.post('/addNote',async (req, res) => {
    const { title, desc } = req.body
    console.log(req.session.MyID);
    await postmodel.insertMany({
        title, desc, user_id:req.session.MyID
    })
    res.redirect('/home')
})
app.post('/delete',async(req,res)=>{
    const {DeletPost} = req.body
    await Posts.findByIdAndDelete({_id:DeletPost},()=>{
        res.redirect('/home')
    })    
})
app.post('/editnote',async(req,res)=>{
    console.log(req.body);
    const {_id,title, desc} = req.body
    await postmodel.findByIdAndUpdate({_id},{title, desc})
    res.redirect('/home')
})



module.exports = app