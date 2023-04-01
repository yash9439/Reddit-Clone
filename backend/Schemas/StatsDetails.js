const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const StatsSchema = new mongoose.Schema(
    {
        SubGreddiitId: { type: ObjectId, ref: "PostDetails" },
        numberOfReport: Number,
        numberOfDelete: Number,
        postTiming: [{ actionDate : Date }],
        listOfMembers: [{
            actionDate: Date,
            isBlocked: String
        }],
            numberOfDailyVisitor: [{ actionDate : Date }]
    },
    {
        collection: "Stats",
    }
);


mongoose.model("Stats", StatsSchema);