const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const SubPostDetailsSchema = new mongoose.Schema(
    {
        text: String,
        isBlocked: String,
        upVotes: [{type:ObjectId , ref:"UserInfo"}],
        downVotes: [{type:ObjectId , ref:"UserInfo"}],
        postedBy: {type: ObjectId , ref:"UserInfo"}, 
        postedIn: {type: ObjectId , ref:"PostDetails"},
        postedOn: Date,
        comments: [{text:String , postedBy:{type:ObjectId, ref:"UserInfo"}}]
    },
    {
        collection: "SubPostDetails",
    }
);


mongoose.model("SubPostDetails",SubPostDetailsSchema);