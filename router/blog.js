const express = require("express");
const {
	getUserById,
	isSignedIn,
	isAuthenticated,
} = require("../controller/auth");
const {
	getBlogById,
	getBlogInfo,
	addNewBlog,
	updateBlog,
	getAllBlog,
	likeBlog,
	removeLikeBlog,
	removeDislikeBlog,
	dislikeBlog,
	deleteBlog,
} = require("../controller/blog");

const router = express.Router();

router.param("blogId", getBlogById);

router.param("userId", getUserById);

router.get("/blog/:blogId", getBlogInfo);

router.post("/add/blog/:userId", isSignedIn, isAuthenticated, addNewBlog);

router.put(
	"/update/blog/:userId/:blogId",
	isSignedIn,
	isAuthenticated,
	updateBlog,
);

router.get("/all/blog", getAllBlog);

router.get("/add/like/:userId/:blogId", isSignedIn, isAuthenticated, likeBlog);

router.delete("/blog/:blogId", deleteBlog);

router.get(
	"/remove/like/:userId/:blogId",
	isSignedIn,
	isAuthenticated,
	removeLikeBlog,
);

router.get(
	"/add/dislike/:userId/:blogId",
	isSignedIn,
	isAuthenticated,
	dislikeBlog,
);

router.get(
	"/remove/dislike/:userId/:blogId",
	isSignedIn,
	isAuthenticated,
	removeDislikeBlog,
);

module.exports = router;
