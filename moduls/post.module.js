const mongoose = require('mongoose');

const posts = mongoose.Schema({
    title: String,
    desc: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'

    }
})

module.exports = mongoose.model('note', posts);