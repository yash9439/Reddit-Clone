const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const app = express()
const server = http.createServer(app);
const io = socketio(server);

const { JsonWebTokenError } = require("jsonwebtoken")
const mongoose = require('mongoose')
const User = mongoose.model("UserInfo")
const jwt=require("jsonwebtoken")
const JWT_SECRET = "jernfvlie23456]][][42345dsf8nfvDSFGDherheRgh<>?<::";


module.exports = (req,res,next)=> {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json({error:"Authorization Failed"})
    }
    const token = authorization.replace("DASS ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err) {
            return res.status(401).json({error:"Authorization Failed"})
        }
        // console.log(payload," payload ");
        // const {_id} = payload
        // console.log({_id}, " " , _id, " @@@@")
        User.findOne({_id:payload._id}).then(userdata=>{
            req.user = userdata
            // console.log(req.user)
            next()
        })
    })
}