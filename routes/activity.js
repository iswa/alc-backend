const express = require('express')
const Activity = require('../models/activity')
const router = express.Router()

router.get('/',(req,res)=>{
    Activity.find({},(err,data)=>{
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
    Activity.findById(req.params.id,(err,data)=>{
        res.json(data)
    })
})

router.delete('/:id',async (req,res)=>{
    await Activity.findByIdAndDelete(req.params.id)
    res.json({message:'deleted'})
})

router.post('/',(req,res)=>{
    activity = new Activity({
        activityName : req.body.activityName,
        activityDate : req.body.activityDate,
        activityPoints : req.body.activityPoints,
        activityMode : req.body.activityMode
    })
    activity.save(()=> {
        res.json(activity)
    })
})

router.put('/:id',async (req,res)=>{
    await Activity.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message': 'Updated'})
})

module.exports = router