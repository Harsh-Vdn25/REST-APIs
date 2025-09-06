function checkFollowReq(req,res,next){
    const userId = req.userId;
    let creatorId = req.params.id;
    if (userId === creatorId) {
        return res.status(400).json({
            message: "You cannot follow/unfollow yourself."
        });
    }
    next();
}

module.exports=checkFollowReq;