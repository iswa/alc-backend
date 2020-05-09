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

router.get('/aggregate',(req,res)=>{
    userMaster.aggregate([
        { $lookup: { from: 'fun_fridays', localField: 'userName', foreignField : 'funWinner', as: 'Details'} },
        { $lookup: { from: 'fun_fridays', localField: 'userName', foreignField : 'funWinner', as: 'Demo'} }],(err,data)=>{
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
                password : req.body.password,
                type : req.body.type
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

router.post("/login", async(req, res) => {
    // console.log (req.body);
    const email = req.body.email;
    const password = req.body.password;
    userMaster.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            const payload = {
                id: user.id,
                userName: user.userName,
                email: req.body.email,
                type: user.type
            };
            jwt.sign(
                payload,
                '88F47CD887DED',
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, gentoken) => {
                    res.json({
                        success: true,
                        token: "Bearer " + gentoken
                    })
                }
            );
        } if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Incorrect Password" });
        }
      });
    });
  });

module.exports = router