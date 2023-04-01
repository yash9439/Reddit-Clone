const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const SaveForLaterSchema = new mongoose.Schema(
    {
        subPostId: {type: ObjectId , ref:"SubPostDetails"},
        savedBy: {type: ObjectId , ref:"UserInfo"},
        SubGreddiitId: {type: ObjectId, ref:"PostDetails"}
    },
    {
        collection: "SaveForLater",
    }
);


mongoose.model("SaveForLater",SaveForLaterSchema);