const { BlogModel, UserModel } = require('../db');
async function CreateBlog(req, res, err) {
    const { title, content, Category } = req.body;
    const userId = req.userId;
    try {
        const response = await BlogModel.create({
            title: title,
            content: content,
            Category: Category,
            userId: userId
        })
        if (!response) {
            return res.status(403).json({ message: err.message })
        }
        res.status(200).json({ message: "Successfully Inserted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to insert" });
    }
}

async function ReadBlog(req, res) {
    const blogId = req.params.id;
    try {
        const response = await BlogModel.findOne({
            _id: blogId
        })
        if (!response) {
            return res.status(403).json({ message: err.message })
        }
        res.status(200).json({
            message: "Blog sent successfully",
            Blog: response
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to insert" });
    }
}

async function ReadBlogs(req, res) {
    const userId = req.userId;
    try {
        const response = await BlogModel.find({
            userId: userId
        })
        if (!response) {
            return res.status(403).json({ message: err.message })
        }
        res.status(200).json({
            message: "Users Blogs",

        });
    } catch (err) {
        res.status(500).json({ message: "Failed to insert" });
    }
}
async function UpdateBlog(req, res) {
    const { title, content, Category } = req.body;
    const blogId=req.params.id;
    const userId = req.userId;
    const Userblog = await BlogModel.findOne({ userId: userId })
    if (!Userblog) {
        return res.status(401).json({ message: "You are not allowed to update" });
    }
    try {
        const response = await BlogModel.updateOne({
            _id: blogId
        }, {
            title: title,
            content: content,
            Category: Category
        })
        if (!response) {
            return res.status(404).json({ message: "Blog with the given title doesnot exist" });
        }
        res.status(200).json({
            message: "Successfully Updated",
            UpdatedBlog: response
        })
    } catch (err) {
        res.status(500).json({ message: "Server ERROR" });
    }
}

async function DeleteBlog(req, res) {
    const blogId = req.params.id;
    const userId = req.userId;
    const Userblog = await BlogModel.findOne({ userId: userId })
    if (!Userblog) {
        return res.status(401).json({ message: "You are not allowed to update" });
    }
    try {
        const response = await BlogModel.deleteOne({
            _id: blogId
        })
        if (!response) {
            return res.status(404).json({ message: "The blog doesnot exist" });
        }
        res.status(200).json({
            message: "Successfully deleted"
        })
    } catch (err) {
        res.status(500).json({ message: "Server ERROR" });
    }
}


module.exports = {
    CreateBlog,
    ReadBlog,
    ReadBlogs,
    UpdateBlog,
    DeleteBlog
}