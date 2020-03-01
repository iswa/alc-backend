const mongoose = require('mongoose')
const Schema = mongoose.Schema

newSchema = new Schema({
    activityName : String,
    activityDate : Date,
    activityPoints : Number,
    activityMode : String
})

module.exports = mongoose.model('activity',newSchema)