const mongoose = require('mongoose')
const Schema = mongoose.Schema

userMaster = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    type: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('user_master',userMaster)