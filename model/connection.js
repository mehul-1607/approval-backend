const mongoose=require('mongoose');

const con=mongoose.connect("mongodb+srv://18ucs096:mehul@123@approval-system-l3cdf.mongodb.net/signup", { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true, },(err)=>{
    if(!err){
        console.log("connected");
    }
    else{
        console.log("Not connected");
    }
});