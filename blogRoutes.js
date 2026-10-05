const express = require("express");
const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require("../controllers/BlogController");

const router = express.Router();



router.post("/", protect, roleMiddleware("Admin", "Editor", "Author"), createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);


router.put("/:id", protect, roleMiddleware("Admin", "Editor", "Author"), updateBlog);

router.delete("/:id", protect, roleMiddleware("Admin", "Editor", "Author"), deleteBlog);
module.exports = router;