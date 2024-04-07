const express = require('express');
const router = express.Router();
const Person = require('.././models/person');

router.post('/',async (req,res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType=='manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log('Response Fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,
            runValidators: true,
        });
        if(!response){
            return res.status(404).json({error:'Person not foubd'});
        }
        console.log('Data Updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personID = req.params.id;
        const response = await Person.findByIdAndDelete(personID);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('Data Deleted');
        res.status(200).json({message:'Person Deleted Successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports = router;