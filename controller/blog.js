const {db} = require("../config/db");

//Setting req.blog with help of blogId
exports.getBlogById = (req, res, next, id) => {
	let query =
		"SELECT blog.blog_id ,  blog.user_id  , blog.heading, blog.last_updated , blog.value  FROM blog WHERE blog_id = ? ;";
	// let query =

	// 	"SELECT blog.blog_id ,  blog.user_id  , blog.heading, blog.last_updated , blog.value , comment.comment_id  FROM blog LEFT JOIN comment ON comment.blog_id = blog.blog_id  WHERE blog.blog_id = ? ;";
	db.query(query, [id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in getting the blog",
				e: error,
			});
		}
		if (result.length == 0)
			return res.status(400).json({
				error: "Error in getting the blog =",
			});
		result = JSON.parse(JSON.stringify(result));
		let q = "SELECT DISTINCT user_id from likes WHERE blog_id = ? ;";
		db.query(q, [id], (e, r) => {
			if (e) {
				return res.status(400).json({
					error: "Error in getting the blog",
					e: e,
				});
			}

			let qq = "SELECT DISTINCT user_id from dislikes WHERE blog_id = ?";
			let temp = r.map((l) => l.user_id);
			db.query(qq, [id], (ee, rr) => {
				if (ee) {
					return res.status(400).json({
						error: "Error in getting the blog",
						e: ee,
					});
				}
				let temp1 = rr.map((l) => l.user_id);
				let comment_array = [];
				if (result.length >= 1 && result[0].comment_id)
					result.forEach((c) => comment_array.push(c.comment_id));
				let ans = {
					blog_id: result[0].blog_id,
					value: result[0].value,
					user_id: result[0].user_id,
					heading: result[0].heading,
					likes: temp,
					dislikes: temp1,
					last_updated: result[0].last_updated,
					comments: comment_array,
				};
				req.blog = ans;
				next();
			});
		});
	});
};

//Get information about the blog if req.blog exists;
exports.getBlogInfo = (req, res) => {
	if (!req.blog)
		return res.status(400).json({error: "Error in getting the blog"});
	return res.status(200).json({
		blog: req.blog,
	});
};

//Adding new blog
exports.addNewBlog = (req, res) => {
	let query =
		"INSERT INTO blog(value,heading,user_id,last_updated) VALUES(?,?,?,CURRENT_TIMESTAMP)";
	db.query(
		query,
		[req.body.value, req.body.heading, req.user.user_id],
		(error, result) => {
			console.log(error);
			if (error) {
				return res.status(400).json({
					error: "Error in adding the blog",
					e: error,
				});
			}
			return res.status(200).json({
				message: "Blog added successfully",
			});
		},
	);
};

//Updating the new blog
exports.updateBlog = (req, res) => {
	let query = "UPDATE blog SET  ? WHERE blog_id = ? ;";
	db.query(query, [req.body, req.blog.blog_id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in updating the blog",
				e: error,
			});
		}
		return res.status(200).json({
			message: "Blog updated successfully",
		});
	});
};

//Get all blog
exports.getAllBlog = (req, res) => {
	let query =
		"SELECT blog.blog_id ,blog.user_id , blog.value, blog.heading , CASE WHEN COUNT(DISTINCT likes.user_id) IS NULL THEN 0  ELSE COUNT(DISTINCT likes.user_id) END AS likes , CASE WHEN COUNT(DISTINCT dislikes.user_id) IS NULL THEN 0  ELSE COUNT(DISTINCT dislikes.user_id) END AS dislikes FROM blog LEFT JOIN likes ON likes.blog_id = blog.blog_id LEFT JOIN dislikes ON dislikes.blog_id = blog.blog_id GROUP BY blog_id;";
	db.query(query, (error, result) => {
		if (error)
			return res.status(400).json({
				error: "Error in getting the blog",
				e: error,
			});
		result = JSON.parse(JSON.stringify(result));
		return res.status(200).json({
			blogs: result,
		});
	});
};

//Like blog By BlogId and userId
exports.likeBlog = (req, res) => {
	let query = "INSERT INTO likes (blog_id,user_id)VALUES(? , ?)";
	db.query(query, [req.blog.blog_id, req.user.user_id], (error, result) => {
		if (error)
			return res.status(400).json({
				error: "Error in adding the like ",
				e: error,
			});
		return res.status(200).json({
			message: "liked👍🏼",
		});
	});
};

exports.removeLikeBlog = (req, res) => {
	let query = "DELETE FROM likes WHERE blog_id = ? AND user_id =  ?";
	db.query(query, [req.blog.blog_id, req.user.user_id], (error, result) => {
		if (error)
			return res.status(400).json({
				error: "Error in removing the like ",
				e: error,
			});
		return res.status(200).json({
			message: "like removed👍🏼",
		});
	});
};

exports.dislikeBlog = (req, res) => {
	let query = "INSERT INTO dislikes (blog_id,user_id)VALUES(? , ?)";
	db.query(query, [req.blog.blog_id, req.user.user_id], (error, result) => {
		if (error)
			return res.status(400).json({
				error: "Error in adding the dislike ",
				e: error,
			});
		return res.status(200).json({
			message: "disliked👍🏼",
		});
	});
};

exports.removeDislikeBlog = (req, res) => {
	let query = "DELETE FROM dislikes WHERE blog_id = ? AND user_id =  ?";
	db.query(query, [req.blog.blog_id, req.user.user_id], (error, result) => {
		if (error)
			return res.status(400).json({
				error: "Error in removing the dislike ",
				e: error,
			});
		return res.status(200).json({
			message: "removed disliked👍🏼",
		});
	});
};
