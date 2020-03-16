const express = require('express')
const learningSaturday = require('../models/learningSaturday')
const router = express.Router()

router.get('/',(req,res)=>{
    learningSaturday.find({},(err,data)=>{
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
    learningSaturday.findById(req.params.id,(err,data)=>{
        res.json(data)
    })
})

router.delete('/:id',async (req,res)=>{
    await learningSaturday.findByIdAndDelete(req.params.id)
    res.json({message:'deleted'})
})

router.post('/',(req,res)=>{
    learningSat = new learningSaturday({
        learningDate : req.body.learningDate,
        learningDay : req.body.learningDay,
        learningActivityName : req.body.learningActivityName
    })
    learningSat.save(()=> {
        res.json(learningSat)
    })
})

router.put('/:id',async (req,res)=>{
    await learningSaturday.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message': 'Updated'})
})

module.exports = router