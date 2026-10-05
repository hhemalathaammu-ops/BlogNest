const Comment = require("../models/Comment");

const createComment = async (req, res) => {
    try {
        const { blog, content } = req.body;

        const comment = await Comment.create({
            blog,
            content,
            user: req.user.id
        });

        res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        res.status(500).json({
            message: "Comment creation failed",
            error: error.message
        });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            blog: req.params.blogId
        })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch comments",
            error: error.message
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Comment deletion failed",
            error: error.message
        });
    }
};

module.exports = {
    createComment,
    getComments,
    deleteComment
};