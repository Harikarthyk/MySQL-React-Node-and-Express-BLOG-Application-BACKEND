const express = require("express");
const {getUserById} = require("../controller/auth");
const {getBlogById, getAllBlog} = require("../controller/blog");
const {
	addComment,
	updateComment,
	getComment,
	getAllCommentForBlog,
} = require("../controller/comment");

const router = express.Router();

router.param("userId", getUserById);

router.param("blogId", getBlogById);

router.post("/add/comment/:userId/:blogId", addComment);

router.put("/update/comment/:userId/:blogId", updateComment);

router.get("/all/comments/:blogId", getAllCommentForBlog);

router.get("/comment", getComment);

module.exports = router;
