const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types


const UserDetailsSchema = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        username: {type : String, unique: true}, 
        email: String, 
        age: Number, 
        contactNumber: Number,
        password: String,
        followers:[{type:ObjectId,ref:"UserInfo"}],
        following:[{type:ObjectId,ref:"UserInfo"}]
    },
    {
        collection: "UserInfo",
    }
);


mongoose.model("UserInfo",UserDetailsSchema);