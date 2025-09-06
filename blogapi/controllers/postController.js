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
            return res.status(403).json({ message: "Failed to create a blog.Please check your inputs/try again" })
        }
        res.status(200).json({ message: "Successfully posted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function ReadBlog(req, res) {
    const blogId = req.params.id;
    try {
        const response = await BlogModel.findOne({
            _id: blogId
        })
        if (!response) {
            return res.status(403).json({ message:"This blog doesn't exist"})
        }
        res.status(200).json({
            message: "Blog sent successfully",
            Blog: response
        });
    } catch (err) {
        res.status(500).json({ message: err.message  });
    }
}

async function ReadBlogs(req, res) {
    const userId = req.userId;
    try {
        const response = await BlogModel.find({
            userId: userId
        })
        if (!response) {
            return res.status(403).json({ message:"No blogs available"})
        }
        res.status(200).json({
            message: "Users Blogs"//Implement this after introducing the like and category schema
        });
    } catch (err) {
        res.status(500).json({ message: err.message  });
    }
}
async function UpdateBlog(req, res) {
    const { title, content, Category } = req.body;
    const blogId=req.params.id;
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
        res.status(500).json({ message: err.message });
    }
}

async function DeleteBlog(req, res) {
    const blogId = req.params.id;
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
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    CreateBlog,
    ReadBlog,
    ReadBlogs,
    UpdateBlog,
    DeleteBlog
}