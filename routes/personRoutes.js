const express=require("express");
const router=express.Router();
const Person = require("../models/person");

// post route to add person
router.post("/",async(req,res)=>{
    try {
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log("data saved");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error"});
        
    }
})
// get to find person
router.get("/",async(req,res)=>{
    try {

        const data=await Person.find();
        console.log("data fetched");
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error"});
        
    }
})

router.get("/:workType",async(req,res)=>{
    try {
        const workType=req.params.workType;
        if(workType=="chef" || workType=="manager" || workType=="waiter"){
            const response=await Person.find({work:workType})
            console.log("response fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"invalid work"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error"});
    }
})

// DELETED 
router.delete("/:id",async(req,res)=>{
    try {
        const personID=req.params.id;
        const response=await Person.findByIdAndDelete(personID);
        if(! response){
            return res.status(400).json({error:"person not found"});
        }
        else{
            console.log("data deleted");
            res.status(200).json({message:"person deleted successfully"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error"});
    }
})

module.exports=router