const { FollowModel, UserModel } = require('../db');
async function Follow(req, res) {
    const userId = req.userId;
    let creatorId = req.params.id;
    try {
        const isFollowing = await FollowModel.findOne({
            userId: userId,
            CreatorId: creatorId
        })
        if (isFollowing) {
            return res.status(400).json({
                message: "You are already following him."
            })
        }
        const response = await FollowModel.create({
            userId: userId,
            CreatorId: creatorId
        })
        if (!response) {
            res.status(404).json({
                message: "Creator with that id is not found"
            })
        }
        creatorId = response.CreatorId.toString();

        const creator = await UserModel.findOne({
            _id: creatorId
        })
        console.log(response);
        res.status(200).json({
            message: `Following ${creator.firstName} ${creator.lastName}`
        })
    } catch (err) {
        res.status(500).json({
            message: "Can't Follow",
            error: err.message
        })
    }
}

async function UnFollow(req, res) {
    const creatorId = req.params.id;
    const userId = req.userId;
    try {
        const response = await FollowModel.deleteOne({
            userId: userId,
            CreatorId: creatorId
        })
        if (!response.deletedCount > 0) {
            return res.status(400).json({ message: "You don't follow this creator" });
        }
        res.status(200).json({ message: "Unfollowed" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    Follow,
    UnFollow
}