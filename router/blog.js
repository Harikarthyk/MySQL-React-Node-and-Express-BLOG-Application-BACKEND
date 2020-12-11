const express = require("express");
const {getUserById} = require("../controller/auth");
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
} = require("../controller/blog");

const router = express.Router();

router.param("blogId", getBlogById);

router.param("userId", getUserById);

router.get("/blog/:blogId", getBlogInfo);

router.post("/add/blog/:userId", addNewBlog);

router.put("/update/blog/:userId/:blogId", updateBlog);

router.get("/all/blog", getAllBlog);

router.get("/add/like/:userId/:blogId", likeBlog);

router.get("/remove/like/:userId/:blogId", removeLikeBlog);

router.get("/add/dislike/:userId/:blogId", dislikeBlog);

router.get("/remove/dislike/:userId/:blogId", removeDislikeBlog);
module.exports = router;
