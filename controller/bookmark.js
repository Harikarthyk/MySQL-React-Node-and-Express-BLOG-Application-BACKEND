const {db} = require("../config/db");

exports.addBookMark = (req, res) => {
	let query = "INSERT INTO bookmark(user_id,blog_id)VALUES(?,?);";
	db.query(query, [req.user.user_id, req.blog.blog_id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in bookmarking the blog",
				e: error,
			});
		}
		return res.status(200).json({
			message: "Bookmark added ",
		});
	});
};

exports.removeBookmark = (req, res) => {
	let query = "DELETE FROM bookmark WHERE blog_id = ? AND user_id =? ;";
	db.query(query, [req.blog.blog_id, req.user.user_id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in removing the bookmark",
				e: error,
			});
		}
		return res.status(200).json({
			message: "Bookmark removed",
		});
	});
};

exports.getAllBookmarkByUserId = (req, res) => {
	let query =
		"SELECT DISTINCT blog.blog_id , blog.last_updated , blog.value , blog.user_id , blog.heading ,bookmark.bookmark_id , COUNT(DISTINCT likes.user_id) AS likes , COUNT(DISTINCT dislikes.user_id) AS dislikes FROM bookmark LEFT JOIN blog ON bookmark.blog_id = blog.blog_id LEFT JOIN likes on likes.blog_id = bookmark.blog_id LEFT JOIN dislikes on dislikes.blog_id = bookmark.blog_id WHERE bookmark.user_id = ? GROUP BY likes.user_id ;";

	db.query(query, [req.user.user_id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in finding all bookmarks",
				e: error,
			});
		}
		return res.status(200).json({
			bookmarks: result,
		});
	});
};

exports.getAllBookmarkByBlogId = (req, res) => {
	let query = "SELECT user_id FROM bookmark WHERE blog_id = ?;";

	db.query(query, [req.blog.blog_id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in finding all bookmarks",
				e: error,
			});
		}
		return res.status(200).json({
			bookmarks: result,
		});
	});
};
