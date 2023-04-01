const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// isBlocked = 0 => Joined
//             1 => Blocked

const PostDetailsSchema = new mongoose.Schema(
    {
        title: String,
        body: String,
        photo: String, 
        tags: [{type: String}],
        bannedKeywords: [{type: String}],
        numberOfPeople: Number,
        numberOfSubPost: Number,
        date: Date,
        postedBy: {type: ObjectId , ref:"UserInfo"}, 
        listOfMembers: [{
            memberDetails: {type: ObjectId, ref:"UserInfo"},
            isBlocked: String
        }]
    },
    {
        collection: "PostDetails",
    }
);


mongoose.model("PostDetails",PostDetailsSchema);