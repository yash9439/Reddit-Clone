const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/protectedRoutes')
const Post = mongoose.model('PostDetails')
const SubPost = mongoose.model('SubPostDetails')
const User = mongoose.model("UserInfo")
const bcrypt = require("bcryptjs")



router.get('/profile', requireLogin, (req, res) => {
    User.find({ _id: req.user._id })
        .populate("followers", "_id fname lname username")
        .populate("following", "_id fname lname username")
        .then(myprofile => {
            res.json({ myprofile })
        })
        .catch(err => {
            console.log(err)
        })
})


router.put('/editprofile', requireLogin, (req, res) => {
    console.log(req.body)
    if(req.body.password !== "") {
        req.body.password = bcrypt.hashSync(req.body.password, 13);
        req.body.data[0].password = req.body.password
    }
    if(req.body.fname !== "") {
        req.body.data[0].fname = req.body.fname
    }
    if(req.body.lname !== "") {
        req.body.data[0].lname = req.body.lname
    }
    if(req.body.username !== "") {
        req.body.data[0].username = req.body.username
    }
    if(req.body.email !== "") {
        req.body.data[0].email = req.body.email
    }
    if(req.body.age !== "") {
        req.body.data[0].age = req.body.age
    }
    if(req.body.contactNumber !== "") {
        req.body.data[0].contactNumber = req.body.contactNumber
    }
    console.log(req.body)
    // Update the user's information in the database
    User.findByIdAndUpdate(req.user._id, req.body.data[0], { new: true }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})










module.exports = router;