const {db} = require("../config/db");

//Add new Comment to the blog_id by user_id
exports.addComment = (req, res) => {
	let query =
		"INSERT INTO comment (user_id,blog_id,comment,last_updated) VALUES(?,?,?,CURRENT_TIMESTAMP)";
	db.query(
		query,
		[req.user.user_id, req.blog.blog_id, req.body.comment],
		(error, result) => {
			if (error) {
				return res.status(400).json({
					error: "Error in adding the comment",
					e: error,
				});
			}
			return res.status(200).json({
				message: "Commented",
			});
		},
	);
};

//Update comment of blog_id by user_id
exports.updateComment = (req, res) => {
	let query = "UPDATE comment SET comment = ? WHERE comment_id = ?; ";
	db.query(query, [req.body.comment, req.body.comment_id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in Editing the comment",
			});
		}
		return res.status(200).json({
			message: "Edited the comment",
		});
	});
};

//Get all comment for blog_id
exports.getAllCommentForBlog = (req, res) => {
	let query =
		"SELECT comment.comment_id ,comment.comment , comment.last_updated , comment.user_id , comment.user_id,  user.name FROM comment LEFT JOIN user ON comment.user_id = user.user_id  WHERE blog_id = ? ";
	db.query(query, [req.blog.blog_id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in getting the comments",
				e: error,
			});
		}
		// console.log(result);
		return res.status(200).json({
			comments: result,
		});
	});
};

//Get comment on comment Id
exports.getComment = (req, res) => {
	let query = "SELECT * FROM comment WHERE comment_id = ?";
	db.query(query, [req.body.comment_id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in getting the comment",
				e: error,
			});
		}
		return res.status(200).json({
			comment: result,
		});
	});
};
