const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const signup=require('./model/signup.model');
const path = require("path");
const bodyParser=require("body-parser");
const {name,email}=require('./view/approval-front/google.js')

router.get('/',(req,res)=>{
   
   res.sendfile(`${__dirname}/view/approval-front/signup.html`)

   

   
});

router.post('/',(req,res)=>{
    
    const person=new signup();
    person.email=req.body.email;
    person.name=req.body.name;
    person.password=req.body.password;
    console.log("name hai"+name);
    console.log("email hai"+email);
   
    signup.findOne({email :person.email})
            .then(signup=>{
                console.log(signup);
                if(signup ==null|| signup==undefined){
                    person.save((err,docs)=>{
                    if(!err){
                        res.send("<h1 >Your have successfully signed up.<br>Please login to continue..</h1>");
                        console.log("Signup successfull")
                        console.log(docs);
                    }
                    else{
                        res.send("<h1>An error Occured while Signup</h1>");
                    }
                })
            }
            
                else{
                    res.send("<h1>This email is already registered</h1>");
                    console.log("alearedy registered");
                }
            })
            .catch(err=>{
                res.send("<h1>An error Occured while search for a entry</h1>");
            });

})

module.exports=router;








