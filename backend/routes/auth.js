const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("UserInfo")
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const JWT_SECRET = "jernfvlie23456]][][42345dsf8nfvDSFGDherheRgh<>?<::";
const requireLogin = require('../middleware/protectedRoutes')

router.get('/protected', requireLogin, (req, res) => {
    res.send("hello")
})

router.post('/signup', (req, res) => {
    const { fname, lname, username, email, age, contactNumber, password } = req.body
    if (!fname || !lname || !username || !email || !age || !contactNumber || !password) {
        return res.status(422).json({ error: "Please Fill all the fields" })
    }
    User.findOne({ username: username })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Username already taken" })
            }
            bcrypt.hash(password, 13)
                .then(hashedPassword => {
                    const user = new User({
                        fname, lname, username, email, age, contactNumber, password:hashedPassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "Registered Successfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

router.post('/signin',(req,res)=>{
    const {username,password} = req.body
    if(!username || !password) {
        return res.status(422).json({error:"Fill the required Fields"})
    }
    User.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser) {
            return res.status(422).json({error:"Invalid username"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch) {
                // const token = jwt.sign({username}, JWT_SECRET);
                // res.json({token , message: "Successfully Logged In"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                console.log(token)
                const {_id,fname,username,email} = savedUser
                res.json({token,user:{_id,fname,username,email},message: "Successfully Logged In"})
                
            }
            else {
                return res.status(422).json({error:"Invalid password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router