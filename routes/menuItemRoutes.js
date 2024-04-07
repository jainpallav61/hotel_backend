const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
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
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:tasteType',async (req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType=='spicy' || tasteType=='sour' || tasteType=='sweet'){
            const response = await MenuItem.find({taste:tasteType});
            console.log('Response Fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid taste type'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const menuItemId = req.params.id;
        const updatedMenuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemId,updatedMenuItemData,{
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error:"MEnu Item not found"});
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
        const menuItemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuItemId);
        if(!response){
            return res.status(404).json({error:'Menu item not found'});
        }
        console.log('Data Deleted');
        res.status(200).json({message:'Menu Item deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports = router;