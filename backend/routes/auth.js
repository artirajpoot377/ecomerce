const express = require('express')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs")
// const {body, validtionResult} = require('express-validator');

// router.post('/', [
//     body('name').isLength({min:3}),
//     body('email').isEmail(),
//     body('password').isLength({min:5}),
// ],
// (req, res)=>{
//    const errors = validtionResult(req);
//    if(!errors.isEmpty()){
//     return res.send(400).json({errors: errors.array()});
//    }
//    User.create({
//     username:req.body.name,
//     password:req.body.password,
//     email:req.body.email,
//    }).then(user => res.json(user))
//    .catch(err=>{console.log(err)})
// })
// module.exports = router





const stringvalid =/[^(A-Z)]+[a-z]+(?:(?:|['_\. ])([a-z]*(\.\D)?[a-z])+)*$/


function stringVerify(value) {
    if (typeof value !== "string" || value.length == 0) {
        return false
    }
    return true
}

//--------------------------createUser api---------------------//

const createUser = async function (req, res) {

    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ msg: "Please Enter details" });
        }
        let { name, email, password, date } = data;

        if (!name) {
            return res.status(400).send({ msg: "name is required" });
        }
        if (name) {
            if (!stringVerify(name)) {
                return res.status(400).send({ msg: "name should be type string" });
            }
        }
        //..hashing
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds)
       
        if (!password) {
            return res.status(400).send({ msg: "Password is required" });
        }
        const passwordFormat = /^[a-zA-Z0-9]{6,10}$/
        const validPassword = passwordFormat.test(password)
        if (!validPassword) {
            return res.status(400).send({ status: false, msg: " Incorrect Password, It should be of 6-10 digits with atlest one special character, alphabet and number" });
        }
        if (!email) {
            return res.status(400).send({ msg: "Email is required" })
        }
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        const validEmail = emailFormat.test(email)
        if (!validEmail) {
            return res.status(400).send({ msg: "Please enter valid Email" });
        }
        let emailinUse= await User.findOne({email:email})
        if(emailinUse)return res.status(400).send({status:false,msg:"email already in use"})

        const userData = {
            name: name, email: email,
            password: hash, date: date
          }
        let authordata = await User.create(userData)
         return  res.status(201).send({ status:true , data: authordata });
    }
    catch (err) {
        res.status(500).send({ error: err.message, status: false });
    }
}
module.exports = createUser