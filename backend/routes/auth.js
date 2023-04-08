const express = require('express')
const router = express.Router();
const User = require('../models/User');
const {body, validtionResult} = require('express-validator')

router.post('/', [
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
],
(req, res)=>{
   const errors = validtionResult(req);
   if(!errors.isEmpty()){
    return res.send(400).json({errors: errors.array()});
   }
   User.create({
    username:req.body.name,
    password:req.body.password,
    email:req.body.email,
   }).then(user => res.json(user))
   .catch(err=>{console.log(err)})
})
module.exports = router