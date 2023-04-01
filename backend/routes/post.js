const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/protectedRoutes')
const Post = mongoose.model('PostDetails')
const SubPost = mongoose.model('SubPostDetails')
const SavedPost = mongoose.model('SaveForLater')
const Request = mongoose.model('JoiningReqDetails')
const Report = mongoose.model('ReportDetails')
const Stats = mongoose.model('Stats')
// const PostMembers = mongoose.model('PostMembersDetails')

router.get('/allPost',requireLogin,(req,res)=> {
    Post.find()
    // .populate("postedBy","_id username")
    .then(posts=> {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/allTags',requireLogin,(req,res)=> {
    PostDetails.aggregate([
        { $group: { _id: "$tags", allTags: { $addToSet: "$tags" } } },
        { $project: { _id: 0, allTags: 1 } }
    ])
    .exec()
    .then((tags) => {
        console.log(tags);
    })
    .catch((error) => {
        console.log(error);
    });
})

router.post('/createPost',requireLogin,(req,res)=> {
    const { title, body, photo, tags, bannedKeywords, id_mem } = req.body
    if(!title || !body || !photo) {
        return res.status(422).json({error:"Post Cant be empty"})
    }
    // req.user.password = undefined
    console.log(id_mem);
    const post = new Post({
        title : title,
        body : body,
        photo : photo,
        tags : tags,
        bannedKeywords : bannedKeywords,
        numberOfPeople : 1,
        numberOfSubPost : 0,
        date: new Date(),
        postedBy : req.user,
        listOfMembers : [{"memberDetails": req.user._id , isBlocked:"0"}]
    })
    post.save().then(result=>{
        // console.log(result)
        res.json({post:result})
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/myPost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    // .populate("postedBy","_id username")
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/allPost',requireLogin,(req,res)=>{
    Post.find()
    // .populate("postedBy","_id username")
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myNotPost',requireLogin,(req,res)=>{
    Post.find({postedBy:{$ne: req.user._id}})
    // .populate("postedBy","_id username")
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myJoinedPostMod',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myJoinedPost',requireLogin,(req,res)=>{
    Post.find({
      "listOfMembers": {
        $elemMatch: {
          memberDetails: req.user._id,
          isBlocked: "0"
        }
    },
    postedBy: { $ne: req.user._id }
      })
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myBlockedPost',requireLogin,(req,res)=>{
    Post.find({
        "listOfMembers": {
            $elemMatch: {
              memberDetails: req.user._id,
              isBlocked: "1"
            }
        },
      })
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myNotJoinedPost',requireLogin,(req,res)=>{
    Post.find({
        "listOfMembers.memberDetails": { $ne: req.user._id },
      })
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/myLeftPost',requireLogin,(req,res)=>{
    Post.find({
        "listOfMembers": {
            $elemMatch: {
              memberDetails: req.user._id,
              isBlocked: "2"
            }
        },
      })
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.put('/SubGreddiitDeleteJoinReq',requireLogin,(req,res)=> {
    Request.deleteMany({ "postedIn": req.body.id }, function (err) {
        if (err) {
            console.error(err);
        }  
        else {
            console.log("Done")
        }
      });
})


router.put('/SubGreddiitDelete',requireLogin,(req,res)=> {
    Post.deleteOne({ _id: req.body.id }, function (err) {
        if (err) {
            console.error(err);
        }  
      });
})

router.put('/SubGreddiitDeleteReport',requireLogin,(req,res)=> {
    Report.deleteMany({ reportedOnSubGreddiitPost: req.body.id }, function (err) {
        if (err) {
            console.error(err);
        }  
      });
})

router.put('/SubGreddiitDeleteSubPost',requireLogin,(req,res)=> {
    SubPost.deleteMany({ postedIn: req.body.id }, function (err) {
        if (err) {
            console.error(err);
        }  
      });
})


router.put('/SubGreddiitDeleteStats',requireLogin,(req,res)=> {
    Stats.deleteMany({ SubGreddiitId: req.body.id }, function (err) {
        if (err) {
            console.error(err);
        }  
      });
})

router.put('/SubGreddiitDeleteSaved',requireLogin,(req,res)=> {
    SavedPost.deleteMany({ SubGreddiitId: req.body.id }, function (err) {
        if (err) {
            console.error(err);
        }  
      });
})









// SubPost APIs

router.post('/createSubPost',requireLogin,(req,res)=> {
    const { text, postedIn } = req.body
    // {console.log(req.body)}
    // {console.log(postedIn)}
    if(!text) {
        return res.status(422).json({error:"SubPost Cant be empty"})
    }
    // req.user.password = undefined
    // console.log(req.user);
    const subPost = new SubPost({
        text : text,
        isBlocked: "0",
        upVotes : [],
        downVotes : [],
        postedBy : req.user,
        postedIn : postedIn,
        postedOn : Date(),
        comments: []
    })
    subPost.save().then(result=>{
        // console.log(result)
        res.json({subPost:result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/mySubPost',requireLogin,(req,res)=>{
    SubPost.find({postedIn:req.query._id})
    .populate("postedBy","_id username")
    .populate("comments.postedBy" , "_id fname")
    .populate("postedIn")
    .then(mySubPost1=>{
        if(!mySubPost1) {
            return res.status(422).json({error:"No SubPost Present"})
        }
        const mySubPost = mySubPost1.map(subPost => {
            if (subPost.isBlocked === "1") {
              subPost.postedBy.username = "BlockedUser";
            }
            return subPost;
        });
        res.json({mySubPost})
        
    })
    .catch(err=>{
        console.log(err)
    })
})

// router.get('/mySubPost', requireLogin, async (req, res) => {
//     try {
//         console.log("Why")
//       const page = parseInt(req.query.page) || 1; // get the current page from the query parameters
//       const pageSize = parseInt(req.query.pageSize) || 4; // get the number of items per page from the query parameters
//       const skip = (page - 1) * pageSize; // calculate the number of items to skip
  
//       const subPosts = await SubPost.find({postedIn:req.query._id})
//         .skip(skip)
//         .limit(pageSize)
//         .populate("postedBy","_id username")
//         .populate("comments.postedBy" , "_id fname")
//         .populate("postedIn")
//         .exec();
//         // console.log(subPosts)
//       if (subPosts.length === 0) {
//         res.status(404).json({ message: "No more sub-posts found." });
//       } else {
//         const mySubPost = subPosts.map(subPost => {
//           if (subPost.isBlocked === "1") {
//             subPost.postedBy.username = "BlockedUser";
//           }
//           return subPost;
//         });
//         // console.log(mySubPost)
//         res.json({ mySubPost });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   });
  


router.put('/upvote',requireLogin,(req,res)=> {
    SubPost.findByIdAndUpdate(req.body.subPostId, {
        $push:{upVotes:req.user._id},
        $pull:{downVotes:req.user._id}
    },{
        new:true
    }).populate("comments.postedBy" , "_id fname")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
})

router.put('/downvote',requireLogin,(req,res)=> {
    SubPost.findByIdAndUpdate(req.body.subPostId, {
        $push:{downVotes:req.user._id},
        $pull:{upVotes:req.user._id}
    },{
        new:true
    }).populate("comments.postedBy" , "_id fname")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=> {
    const comment = {
        text : req.body.text,
        postedBy : req.user._id
    }
    SubPost.findByIdAndUpdate(req.body.subPostId, {
        $push:{comments: comment}
    },{
        new:true
    }).populate("comments.postedBy" , "_id fname")
    .exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
})


router.put('/refresh',requireLogin,(req,res)=> {
    SubPost.findByIdAndUpdate(req.body.subPostId, {

    },{
        new:true
    }).populate("comments.postedBy" , "_id fname")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
})



router.get('/savedPost',requireLogin,(req,res) => {
    SavedPost.find({savedBy : req.user._id})
    .populate({
        path: 'subPostId',
        populate: { path: 'postedIn comments.postedBy' }
      })

    .then(mySavedPost=>{
        if(!mySavedPost) {
            return res.status(422).json({error:"No Saved Post Present"})
        }
        res.json({mySavedPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/incPostCnt',requireLogin,(req,res)=> {
    Post.updateOne({_id: req.body.id}, {
        $inc: {numberOfSubPost: 1}
    }, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    })
})

module.exports = router;