
const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;

        const blog = await Blog.create({
            title,
            content,
            category,
            tags,
            author: req.user.id
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Blog creation failed",
            error: error.message
        });
    }
};


const getBlogs = async (req, res) => {
    try {
        const search = req.query.search;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } },
                    { tags: { $regex: search, $options: "i" } }
                ]
            };
        }

        const blogs = await Blog.find(query)
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(blogs);

    } catch (error) {
        res.status(500).json({
            message: "Failed to search blogs",
            error: error.message
        });
    }
};


const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("author", "name email");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch blog",
            error: error.message
        });
    }
};


const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        res.status(500).json({
            message: "Blog update failed",
            error: error.message
        });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json({
            message: "Blog deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Blog deletion failed",
            error: error.message
        });
    }
};


module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};