const express=require('express');
const router=express.Router();
const bodyParser=require("body-parser");
const User=require('./model/signup.model');
const crypto = require('crypto');
const async = require('async');
const session = require('express-session')
const nodemailer = require('nodemailer');
const token=require('./forgot');

router.use(express.static('view/approval-front'));

router.get('/:token',function(req,res){
    
  
    User.findOne({resetPasswordToken: req.params.token,resetPasswordExpires:{$gt: Date.now()}},function(err,user){
       if(!user){
           //req.flash('error','Password reset token is invalid or has expired.');
           return res.redirect('/forgot');
           console.log("user exist");
       }
       res.sendFile(`${__dirname}/view/approval-front/reset.html`);
       console.log("got a user");
    })
});

router.post('/:token',function(req,res){
    async.waterfall([
        function(done){
            console.log("token "+req.params.token);
            User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){ 
            if(!user){
               // req.flash('error','Password rest token is invalid or has expired.');
                return res.redirect('/forgot')
            }
            user.password=req.body.password;
            user.resetPasswordToken=undefined;
            user.resetPasswordExpires=undefined;
            console.log("pass has been reseted");
            user.save(function(err){
                res.redirect('/');
                done(err,user);
            });
        });
      
    },
    function(user,done){
        var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'approval.reset@gmail.com',
              pass: 'approval@123'
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'approval.reset@gmail.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
           // req.flash('success', 'Success! Your password has been changed.');
            done(err);
          });
        }
    ],function(err){
        res.redirect('/forgot');
    });
});
module.exports=router;