const express = require('express')
const team = require('../models/team')
const router = express.Router()

router.get('/',(req,res)=>{
    team.find({},(err,data)=>{
        res.json(data)
    })
})

router.get('/:id',(req,res)=>{
    team.findById(req.params.id,(err,data)=>{
        res.json(data)
    })
})

router.delete('/:id',async (req,res)=>{
    await team.findByIdAndDelete(req.params.id)
    res.json({message:'deleted'})
})

router.post('/',(req,res)=>{
    teams = new team({
        memberName : req.body.memberName,
        role : req.body.role,
        teamName : req.body.teamName
    })
    teams.save(()=> {
        res.json(teams)
    })
})

router.put('/:id',async (req,res)=>{
    await team.findByIdAndUpdate(req.params.id,req.body)
    res.json({'message': 'Updated'})
})

module.exports = router