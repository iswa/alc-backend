const mongoose = require('mongoose')
const Schema = mongoose.Schema

learningSaturday = new Schema({
    learningDate : Date,
    learningDay : Number,
    learningActivityName : String,
})

module.exports = mongoose.model('learning_saturday',learningSaturday)