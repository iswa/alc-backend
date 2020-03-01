const express = require('express')
const FunFriday = require('../models/funFriday')
const router = express.Router()

router.get('/',(req,res)=>{
    FunFriday.find({},(err,data)=>{
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
    FunFriday.findById(req.params.id,(err,data)=>{
        res.json(data)
    })
})

router.delete('/:id',async (req,res)=>{
    await FunFriday.findByIdAndDelete(req.params.id)
    res.json({message:'deleted'})
})

router.post('/',(req,res)=>{
    funFriday = new FunFriday({
        funActivityName : req.body.funActivityName,
        funActivityDate : req.body.funActivityDate,
        funWinner : req.body.funWinner
    })
    funFriday.save(()=> {
        res.json(funFriday)
    })
})

router.put('/:id',async (req,res)=>{
    await FunFriday.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message': 'Updated'})
})

module.exports = router