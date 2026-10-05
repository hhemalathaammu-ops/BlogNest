
const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    createComment,
    getComments,
    deleteComment
} = require("../controllers/CommentController");

const router = express.Router();

router.post("/", protect, createComment);

router.get("/:blogId", getComments);

router.delete("/:id", protect, deleteComment);

module.exports = router;