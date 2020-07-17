const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://event_alc:tirupati@event-alc.qetgv.mongodb.net/event-alc?retryWrites=true&w=majority',{useNewUrlParser : true, useUnifiedTopology : true, serverSelectionTimeoutMS: 5000})
// mongoose.connect('mongodb://localhost:27017/event-alc',{useNewUrlParser : true, useUnifiedTopology : true, serverSelectionTimeoutMS: 5000})
const cors = require('cors')
const app = express()

app.use(express.json())
// app.use(express.urlencoded({extrended: true}))
app.use(cors())

app.use("/activity",require('./routes/activity'))
app.use("/funFriday",require('./routes/funFriday'))
app.use("/learningSaturday",require('./routes/learningSaturday'))
app.use("/userMaster",require('./routes/userMaster'))
app.use("/team",require('./routes/team'))
app.use("/api/user",require('./routes/userMaster'))
app.use("/api/posts",require('./routes/login'))
// app.use("/profile",require('./routes/profile'))

const port = 3000
app.get('/',(req,res)=>{
    res.send(`Server up and running on port ${port}`)
})
console.log('Server is up and Running')
app.listen(port)