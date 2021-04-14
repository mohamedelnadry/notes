const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');
let session = require('express-session')
var flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb+srv://admin:admin@cluster0.fjtlc.mongodb.net/test_db',
  collection: 'mySessions'
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(require('./routes/Register.routes'))
app.use(require('./routes/Login.routes'))
app.use(require('./routes/Home.routes'))
app.get('*',(req,res)=>{
  res.send("404 page not found")
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.fjtlc.mongodb.net/test_db', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected');
}).catch(() => {
  console.log('there are error in db');
});
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port port!`))