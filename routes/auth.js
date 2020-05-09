const express = require('express')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userMaster = require('../models/userMaster')
const router = express.Router()

router.post('/login',async (req,res)=>{

    const user = await userMaster.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Email Not Found')

    const validPassword = await bcrypt.compare( req.body.password ,user.password)
    if(!validPassword) return res.status(400).send('Password Invalid')

    const token = jwt.sign({ _id : user._id, email: user.email },'88F47CD887DED')
    res.header('auth-token', token).send(token)

})
module.exports = router