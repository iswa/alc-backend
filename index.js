const express = require('express')
const mongoose = require('mongoose')
//mongoose.connect('mongodb+srv://event_alc:tirupati@cluster0-qetgv.mongodb.net/event-alc?retryWrites=true&w=majority',{useNewUrlParser : true, useUnifiedTopology : true, serverSelectionTimeoutMS: 5000})
mongoose.connect('mongodb://localhost:27017/event-alc',{useNewUrlParser : true, useUnifiedTopology : true, serverSelectionTimeoutMS: 5000})
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extrended: true}))
app.use(cors())

app.use("/activity",require('./routes/activity'))
app.use("/funFriday",require('./routes/funFriday'))
// app.use("/learningSaturday",require('./routes/learningSaturday'))
// app.use("/profile",require('./routes/profile'))

const port = process.env.PORT | 80
app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(port)