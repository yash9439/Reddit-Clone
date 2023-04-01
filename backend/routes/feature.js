const { json } = require('express');
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/protectedRoutes')
const Request = mongoose.model('JoiningReqDetails')
const User = mongoose.model("UserInfo")
const SaveForLater = mongoose.model('SaveForLater')
// const PostMembers = mongoose.model('PostMembersDetails')
const Report = mongoose.model('ReportDetails')
const SubPost = mongoose.model('SubPostDetails')
const Post = mongoose.model('PostDetails')
const Stats = mongoose.model('Stats')
const nodemailer = require("nodemailer");


router.post('/createReq', requireLogin, (req, res) => {
    const { postedIn } = req.body
    // console.log(req.user);
    Request.findOne({ postedBy: req.user._id, postedIn: postedIn })
        .then((savedRequest) => {
            if (savedRequest) {
                return res.status(422).json({ error: "Request already made" })
            }
            const request = new Request({
                postedBy: req.user,
                postedIn: postedIn,
                postedOn: Date()
            })
            request.save().then(result => {
                // console.log(result)
                res.json({ message: "Join Request Sent Successfully" })
            })
                .catch(err => {
                    console.log(err)
                })
        })
})


router.get('/reqPage', requireLogin, (req, res) => {
    // console.log(req.query._id, "Here is the query id")
    Request.find({ postedIn: req.query._id })
        .populate('postedBy')
        .then(reqpage => {
            if (!reqpage) {
                return res.status(422).json({ error: "No Req present" })
            }
            res.json({ reqpage })
            // console.log({ reqpage })
        })
        .catch(err => {
            console.log(err)
        })
})


router.post('/saveSubPost', requireLogin, (req, res) => {
    const { subPostId, SubGreddiitId } = req.body
    SaveForLater.findOne({ subPostId: subPostId, savedBy: req.user._id })
        .then((savedForLater) => {
            if (savedForLater) {
                return res.status(422).json({ error: "Already Saved for Later" })
            }
            const saveforlater = new SaveForLater({
                subPostId: subPostId,
                savedBy: req.user,
                SubGreddiitId: SubGreddiitId
            })
            saveforlater.save().then(result => {
                // console.log(result)
                res.json({ message: "SubPost successfully saved for later" })
            })
                .catch(err => {
                    console.log(err)
                })
        })
})


// router.put('/following', requireLogin, (req, res) => {
//     User.findByIdAndUpdate(req.user._id, {
//         $push: { following: req.body.postedBy },
//     }, {
//         new: true
//     }).exec((err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         else {
//             res.json(result)
//         }
//         // console.log(result)
//     })
// })

router.put('/following', requireLogin, (req, res) => {
    User.findOne({
        following: req.body.postedBy
    }, (err, user) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        if (user) {
            return res.status(422).json({ error: "Already Following" })
        }
        if(req.body.postedBy._id.toString() === req.user._id.toString()) {
            return res.status(422).json({ error: "Cant follow yourself" })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.postedBy },
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json({message : "Following Successfully"})
            }
        })
    })
})


// router.put('/follower', requireLogin, (req, res) => {
//     User.findByIdAndUpdate(req.body.postedBy, {
//         $push: { followers: req.user._id },
//     }, {
//         new: true
//     }).exec((err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         else {
//             res.json(result)
//         }
//         // console.log(result)
//     })
// })


router.put('/follower', requireLogin, (req, res) => {
    User.findOne({
        followers: req.user._id 
    }, (err, user) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        if (user) {
            return res.status(422).json({ error: "You are already in his followers" })
        }
        if(req.body.postedBy._id.toString() === req.user._id.toString()) {
            return res.status(422).json({ error: "Cant become follower of yourself" })
        }
        User.findByIdAndUpdate(req.body.postedBy, {
            $push: { followers: req.user._id },
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json({message : "Added To Follower"})
            }
        })
    })
})




router.put('/remfollower', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $pull: { followers: req.body.follower },
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})


router.put('/remfollowerOther', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.id, {
        $pull: { following: req.user._id },
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})


router.put('/remfollowing', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $pull: { following: req.body.following },
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})


router.put('/remfollowingOther', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.id, {
        $pull: { followers: req.user._id },
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})


router.put('/addMember', requireLogin, (req, res) => {
    const { memberOf, memberDetails } = req.body
    // console.log(memberOf, " ", memberDetails, " Here")
    Post.findOneAndUpdate({ _id: memberOf }, {
        $push: { "listOfMembers": { "memberDetails": memberDetails, "isBlocked": "0" } }
    }, {
        new: true
    }).exec((err, result) => {
        console.log(err, " Err")
        console.log(result, " Result")
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
    })

})


router.put('/removeReq', requireLogin, (req, res) => {
    Request.findOne({ _id: req.body._id })
        .then((member) => {
            if (member) {
                member.remove()
                return res.json({ msg: "Nice" })
            }
            else {
                return res.status(422).json({ error: "Error" })
            }
        })
})


// router.get('/joinedChk',requireLogin,(req,res)=>{
//     PostMembers.findOne({ memberOf: req.query._id , memberDetails: req.user._id })
//         .then(member => {
//             if(!member) {
//                 return res.json({message:"Available"})
//             }
//             if(member.isBlocked == "1") {
//                 return res.json({message:"Blocked"})
//             }
//             else {
//                 return res.json({message:"Already Joined"})
//             }
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })


router.get('/joinedUser', requireLogin, (req, res) => {
    // console.log(req.query._id, "Here is the query id")
    Post.findOne({ _id: req.query._id })
        .then(result => {
            if (!result) {
                return res.status(422).json({ error: "No Member present" })
            }
            const filteredMembers = result.listOfMembers.filter(obj => obj.isBlocked === "0");
            Post.populate(filteredMembers, { path: "memberDetails" }, (err, populatedMembers) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error while populating the member details" });
                }
                res.json(populatedMembers);
                // console.log(populatedMembers);
            })
        })
        .catch(err => {
            console.log(err)
        })
})


router.get('/blockedUser', requireLogin, (req, res) => {
    // console.log(req.query._id, "Here is the query id")
    // console.log(req.query._id, "Here is the query id")
    Post.findOne({ _id: req.query._id })
        .then(result => {
            if (!result) {
                return res.status(422).json({ error: "No Member present" })
            }
            const filteredMembers = result.listOfMembers.filter(obj => obj.isBlocked === "1");
            Post.populate(filteredMembers, { path: "memberDetails" }, (err, populatedMembers) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error while populating the member details" });
                }
                res.json(populatedMembers);
                // console.log(populatedMembers);
            })
        })
        .catch(err => {
            console.log(err)
        })
})


router.post('/createReport', requireLogin, (req, res) => {
    const { reportedOnSubGreddiit, reportedOnPost, reportConcern, post_postedBy } = req.body
    Report.findOne({ reportedOnPost: reportedOnPost, reportedBy: req.user._id })
        .then((rep) => {
            if (rep) {
                return res.status(422).json({ error: "Already Reported" })
            }
            if(String(post_postedBy._id) === String(req.user._id)) {
                return res.status(422).json({ error: "Cant Report your own post" })
            }
            const report = new Report({
                reportedOnSubGreddiit: reportedOnSubGreddiit,
                reportedOnPost: reportedOnPost,
                reportedBy: req.user,
                reportConcern: reportConcern,
                reportStatus: "Pending",
                reportedOn: Date()
            })
            report.save().then(result => {
                // console.log(result)
                res.json({ message: "Reported Successfully" })
            })
                .catch(err => {
                    console.log(err)
                })
        })
})


router.put('/oldReport', requireLogin, async(req, res) => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    try {
        await Report.deleteMany({ reportedOn: { $lt: tenDaysAgo } });
        res.send({ message: "Reports removed successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error removing reports" });
    }
})


router.get('/getReport', requireLogin, (req, res) => {
    // console.log(req.query._id, "Here is the query id")
    Report.find({ reportedOnSubGreddiit: req.query._id })
        .populate('reportedBy')
        .populate({
            path: 'reportedOnPost',
            populate: { path: 'postedBy' }
        })
        .populate('reportedOnSubGreddiit')
        .then(result => {
            if (!result) {
                return res.status(422).json({ error: "Report doesn't exists" })
            }
            res.json({ result })
            // console.log({ result })
        })
        .catch(err => {
            console.log(err)
        })
})


router.put('/reportIgnore', requireLogin, (req, res) => {
    Report.findByIdAndUpdate(req.body.id, {
        reportStatus: "Ignored"
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})

router.put('/reportBlock_user', requireLogin, (req, res) => {
    Report.findByIdAndUpdate(req.body.id, {
        reportStatus: "Blocked"
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})

router.put('/reportBlock_user_post', requireLogin, async (req, res) => {
    try {
        const pst = await Post.findOne({ _id: req.body.id_greddiit });
        if (!pst) {
            throw new Error("Post not found");
        }

        const memberIndex = pst.listOfMembers.findIndex(
            (member) => member.memberDetails.toString() === req.body.id_user
        );
        if (memberIndex === -1) {
            throw new Error("Member not found in the post");
        }

        pst.listOfMembers[memberIndex].isBlocked = "1";
        await pst.save();
    } catch (error) {
        console.error(error);
    }
})


router.put('/subPost_isBlocked', requireLogin, (req, res) => {
    // console.log(req.body.id_user)
    // console.log("Hello World")
    SubPost.updateMany({ postedBy: req.body.id_user }, { isBlocked: "1" }, function(err, res) {
        if (err) {
          console.log('Error updating SubPostDetails:', err);
        } else {
          console.log('Updated SubPostDetails:', res);
        }
    });
})


router.put('/reportDelete', requireLogin, (req, res) => {
    Report.findByIdAndDelete(req.body.id, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})


router.put('/reportDelete_post', requireLogin, (req, res) => {
    SubPost.findByIdAndDelete(req.body.id, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})

router.put('/deleteSavedPost', requireLogin, (req, res) => {
    SaveForLater.findByIdAndDelete(req.body.id, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
        // console.log(result)
    })
})


router.put('/leavePost', requireLogin, async (req, res) => {
    try {
        const pst = await Post.findOne({ _id: req.body.id });
        if (!pst) {
            throw new Error("Post not found");
        }

        const memberIndex = pst.listOfMembers.findIndex(
            (member) => member.memberDetails.toString() === req.user._id.toString()
        );
        if (memberIndex === -1) {
            throw new Error("Member not found in the post");
        }

        pst.listOfMembers[memberIndex].isBlocked = "2";
        await pst.save();
    } catch (error) {
        console.error(error);
    }
})










// Stats

router.put('/statsInit', requireLogin, (req, res) => {
    const newStats = new Stats({
        SubGreddiitId: req.body.id,
        numberOfReport: 0,
        numberOfDelete: 0,
        postTiming: [],
        listOfMembers: [{
            actionDate: new Date(),
            isBlocked: "0"
        }],
        numberOfDailyVisitor: []
    });

    newStats.save((error) => {
        if (error) {
            console.error(error, "Error");
        } else {
            console.log("Stats saved.");
        }
    });
})


router.put('/numReport', requireLogin, (req, res) => {
    Stats.updateOne({ SubGreddiitId: req.body.id }, {
        $inc: { numberOfReport: 1 }
    }
        , (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Number of reports increased by 1.");
            }
        });
})


router.put('/numDelete', requireLogin, (req, res) => {
    Stats.updateOne({ SubGreddiitId: req.body.id }, {
        $inc: { numberOfDelete: 1 }
    }
        , (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Number of reports increased by 1.");
            }
        });
})


router.put('/postTiming', requireLogin, (req, res) => {
    Stats.updateOne({ SubGreddiitId: req.body.id }, {
        $push: { postTiming: { actionDate: new Date() } }
    }
        , (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Current date added to postTiming.");
            }
        });
})


router.put('/membersDetJoin', requireLogin, (req, res) => {
    Stats.updateOne({ SubGreddiitId: req.body.id }, {
        $push: {
            listOfMembers: {
                actionDate: new Date(),
                isBlocked: "0"
            }
        }
    }
        , (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("New member added to listOfMembers.");
            }
        });
})

router.put('/membersDetBlock', requireLogin, (req, res) => {
    const newMember = {
        actionDate: new Date(),
        isBlocked: "1"
    };

    Stats.updateOne({ SubGreddiitId: req.body.id }, {
        $push: { listOfMembers: newMember }
    }
        , (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("New member added to listOfMembers.");
            }
        });
})


router.put('/membersDetLeft', requireLogin, (req, res) => {
    const newMember = {
        actionDate: new Date(),
        isBlocked: "2"
    };

    Stats.updateOne({ SubGreddiitId: req.body.id }, {
        $push: { listOfMembers: newMember }
    }
        , (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("New member added to listOfMembers.");
            }
        });
})


router.put('/dailyVisitor', requireLogin, (req, res) => {
    Stats.updateOne({ SubGreddiitId: req.body.id }, {
        $push: { numberOfDailyVisitor: { actionDate: new Date() } }
    }
        , (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Current date added to postTiming.");
            }
        });
})


router.get('/getStats', requireLogin, (req, res) => {
    // console.log(req.query._id, "Here is the query id")
    Stats.find({ SubGreddiitId: req.query._id })
        .then(stats => {
            if (!stats) {
                return res.status(422).json({ error: "No Req present" })
            }
            res.json({ stats })
            // console.log({ stats })
        })
        .catch(err => {
            console.log(err)
        })
})





// Email

router.post('/mail', requireLogin, (req, res) => {
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();
    
        // create reusable transporter object using the default SMTP transport
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'onepiece.iiith@gmail.com',
                pass: 'hdojiyixhzdugdfa'
            }
        });
        
        let details = {
            from: "onepiece.iiith@gmail.com",
            to: req.body.mail,
            subject: "Response",
            text: req.body.msg
        }

        mailTransporter.sendMail(details,(err)=>{
            if(err) {
                console.log(err)
            }
            else {
                console.log("Email Sent!!!")
            }
        })
    }
    
    main().catch(console.error);
})


router.get('/chat', requireLogin, (req, res) => {
    User.aggregate([
      { $match: { _id: req.user._id } },
      { $lookup: { from: 'UserInfo', localField: 'following', foreignField: '_id', as: 'followingUsers' } },
      { $unwind: '$followingUsers' },
      { $lookup: { from: 'UserInfo', localField: 'followingUsers.following', foreignField: '_id', as: 'followingOfFollowingUsers' } },
      { $unwind: '$followingOfFollowingUsers' },
      { $match: { 'followingOfFollowingUsers._id': req.user._id } },
      { $lookup: { from: 'UserInfo', localField: '_id', foreignField: '_id', as: 'userInfo' } },
      { $unwind: '$userInfo' },
      { $project: { _id: '$followingUsers._id', fname: '$followingUsers.fname', lname: '$followingUsers.lname' } }
    ], (err, result) => {
      if (err) {
        console.log('Error:', err);
        res.status(500).send('Error retrieving chat users');
      } else if (result.length === 0) {
        console.log('No matching user found.');
        res.status(404).send('No matching users found');
      } else {
        // console.log('Matching users:', result);
        res.json({ result });
      }
    });
  });



module.exports = router;