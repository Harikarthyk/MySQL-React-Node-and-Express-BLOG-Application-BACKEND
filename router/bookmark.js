const express = require("express");
const {
	addBookMark,
	removeBookmark,
	getAllBookmarkByUserId,
	getAllBookmarkByBlogId,
} = require("../controller/bookmark");
const {
	getUserById,
	isSignedIn,
	isAuthenticated,
} = require("../controller/auth");
const {getBlogById} = require("../controller/blog");

const router = express.Router();

router.param("blogId", getBlogById);

router.param("userId", getUserById);

router.get(
	"/add/bookmark/:userId/:blogId",
	isSignedIn,
	isAuthenticated,
	addBookMark,
);

router.delete(
	"/remove/bookmark/:userId/:blogId",
	isSignedIn,
	isAuthenticated,
	removeBookmark,
);

router.get(
	"/all/bookmark/blog/:blogId",
	isSignedIn,
	isAuthenticated,
	getAllBookmarkByBlogId,
);

router.get(
	"/all/bookmark/user/:userId",
	isSignedIn,
	isAuthenticated,
	getAllBookmarkByUserId,
);

module.exports = router;
