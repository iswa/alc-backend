const mongoose = require('mongoose')
const Schema = mongoose.Schema

funFriday = new Schema({
    funActivityName : String,
    funActivityDate : Date,
    funWinner : String,
})

module.exports = mongoose.model('fun_friday',funFriday)