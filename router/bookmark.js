const express = require("express");
const {
	addBookMark,
	removeBookmark,
	getAllBookmarkByUserId,
	getAllBookmarkByBlogId,
} = require("../controller/bookmark");
const {getUserById} = require("../controller/auth");
const {getBlogById} = require("../controller/blog");

const router = express.Router();

router.param("blogId", getBlogById);

router.param("userId", getUserById);

router.get("/add/bookmark/:userId/:blogId", addBookMark);

router.delete("/remove/bookmark/:userId/:blogId", removeBookmark);

router.get("/all/bookmark/blog/:blogId", getAllBookmarkByBlogId);

router.get("/all/bookmark/user/:userId", getAllBookmarkByUserId);

module.exports = router;
