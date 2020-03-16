const express = require('express')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userMaster = require('../models/userMaster')
const router = express.Router()

router.get('/',(req,res)=>{
    userMaster.find({},(err,data)=>{
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
    userMaster.findById(req.params.id,(err,data)=>{
        res.json(data)
    })
})

router.delete('/:id',async (req,res)=>{
    await userMaster.findByIdAndDelete(req.params.id)
    res.json({message:'deleted'})
})

router.post('/',(req,res)=>{
    userMaster.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
            const userMasters = new userMaster({
                userName : req.body.userName,
                email : req.body.email,
                contactNo : req.body.contactNo,
                password : req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(userMasters.password, salt, (err, hash) => {
                if (err) throw err;
                userMasters.password = hash;
                userMasters
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
})

router.put('/:id',async (req,res)=>{
    await userMaster.findByIdAndUpdate(req.params.id,req.body)
    res.json({message: 'Updated'})
})

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userMaster.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            const payload = {
                id: user.id,
                name: user.name
            };
            jwt.sign(
                payload,
                '88F47CD887DED',
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        } else {
            return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

module.exports = router