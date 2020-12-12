const express = require("express");
const {getUserById, isSignedIn, isAuthenticated} = require("../controller/auth");
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

router.post(
	"/add/comment/:userId/:blogId",
	isSignedIn,
	isAuthenticated,
	addComment,
);

router.put("/update/comment/:userId/:blogId", isSignedIn , isAuthenticated, updateComment);

router.get("/all/comments/:blogId", getAllCommentForBlog);

router.get("/comment", getComment);

module.exports = router;
