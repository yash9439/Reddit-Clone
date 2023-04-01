const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const JoiningReqDetailsSchema = new mongoose.Schema(
    {
        postedBy: {type: ObjectId , ref:"UserInfo"}, 
        postedIn: {type: ObjectId , ref:"PostDetails"},
        postedOn: Date
    },
    {
        collection: "JoiningReqDetails",
    }
);


mongoose.model("JoiningReqDetails",JoiningReqDetailsSchema);