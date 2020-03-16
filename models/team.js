const mongoose = require('mongoose')
const Schema = mongoose.Schema

teams = new Schema({
    memberName : String,
    role : String,
    teamName : String,
})

module.exports = mongoose.model('teams',teams)