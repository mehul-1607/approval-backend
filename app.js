const connection=require('./model/connection');
const express=require('express');
const login=require('./model/signup.model');
const bodyParser=require("body-parser");
const signup=require('./signup');
const path = require("path");
const forgot=require('./forgot');
const port=process.env.PORT||3000;
const app=express();


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('view/approval-front'));

app.use('/signup',signup);

app.use('/forgot',forgot)

app.get('/',(req,res)=>{
   
     res.sendFile(`${__dirname}/view/approval-front/index.html`);
    
    
    
});
app.post('/',(req,res)=>{
   const person=new login();
   person.email=req.body.email;
   person.password=req.body.password;

   login.findOne({email :person.email})
   .then(login=>{
       console.log(login);
       if(login ==null|| login==undefined){
               res.send("<h1 >Your have not registered yet .<br>Please signup to continue..</h1>");
               console.log("NOt registered");
        }
        else{
           res.send("<h1>Welcome to your dashboard</h1>");
           console.log("Successfully login in");
        }
    })
   .catch(err=>{
       res.send("<h1>An error Occured while search for a entry</h1>");
   });
});




app.listen(port,()=>{
    console.log("Server Started"+port);
});