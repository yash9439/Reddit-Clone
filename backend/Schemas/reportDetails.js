const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ReportDetailsSchema = new mongoose.Schema(
    {
        reportedBy: {type: ObjectId , ref:"UserInfo"}, 
        reportedOnPost : {type: ObjectId , ref:"SubPostDetails"},
        reportedOnSubGreddiit: {type: ObjectId , ref:"PostDetails"},
        reportConcern : String,
        reportStatus: String,
        reportedOn: Date
    },
    {
        collection: "ReportDetails",
    }
);


mongoose.model("ReportDetails",ReportDetailsSchema);