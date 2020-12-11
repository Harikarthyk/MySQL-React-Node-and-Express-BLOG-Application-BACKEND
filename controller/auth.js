const {db} = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

//setting req.user
exports.getUserById = (req, res, next, id) => {
	//Inner JOIN query to get the user details and all the blog id written by the user with help of user_id
	let query =
		"SELECT user.name , user.user_id , user.email,blog.blog_id FROM user LEFT JOIN blog ON blog.user_id = user.user_id WHERE user.user_id = ? ; ";
	db.query(query, [id], (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in getting user Information",
				e: error,
			});
		}
		// result = JSON.parse(JSON.stringify(result));
		let blog_array = [];
		if (result[0].blog_id) result.forEach((b) => blog_array.push(b.blog_id));
		let ans = {
			user_id: result[0].user_id,
			name: result[0].name,
			email: result[0].email,
			blog: blog_array,
		};
		req.user = ans;
		next();
	});
};

//register new user
exports.registerUser = (req, res) => {
	let preCheckQuery =
		"SELECT COUNT(user_id) AS user FROM user WHERE email = ? ;";
	db.query(preCheckQuery, req.body.email, (e, r) => {
		if (e) {
			return res.status(400).json({
				error: "Error in creating the account",
			});
		}
		let user = JSON.parse(JSON.stringify(r[0])).user;
		if (user >= 1)
			return res.status(400).json({
				error: "email already exists",
			});
		let query =
			"INSERT INTO user(name,email,password,last_updated) VALUES(?,?,?,CURRENT_TIMESTAMP) ;";

		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(req.body.password, salt, function (err, hash) {
				if (err) {
					return res.status(400).json({
						error: "Error in creating account",
					});
				}
				db.query(
					query,
					[req.body.name, req.body.email, hash],
					(error, result) => {
						if (error) {
							return res.status(400).json({
								error: "Error in registration",
								e: error,
							});
						}
						return res.status(200).json({
							message: "User registration successfull",
						});
					},
				);
			});
		});
	});
};

//Login
exports.login = (req, res) => {
	let preCheckQuery = "SELECT * FROM user WHERE email = ? ;";
	db.query(preCheckQuery, req.body.email, (e, r) => {
		if (e || !r) {
			return res.status(400).json({
				error: "Error in loging in",
				e: e,
			});
		}
		if (r.length == 0)
			return res.status(400).json({
				error: "Wrong email or password",
			});

		let user = JSON.parse(JSON.stringify(r[0]));
		bcrypt.compare(req.body.password, user.password, function (err, result) {
			if (!result)
				return res.status(400).json({
					error: "Wrong email or password",
				});

			let query =
				"SELECT user.name , user.user_id , user.email , blog.blog_id FROM user LEFT JOIN blog ON blog.user_id = user.user_id WHERE user.user_id = ? ; ";
			db.query(query, [user.user_id], (error, _result) => {
				if (error) {
					return res.status(400).json({
						error: "Error in loging in",
						e: error,
					});
				}

				let ans = JSON.parse(JSON.stringify(_result));
				let token = jwt.sign({id: user.user_id}, "secretCode");
				res.cookie("token", token, {
					expires: new Date(Date.now() + 1),
				});
				return res.status(200).json({
					user: ans[0],
					token: token,
				});
			});
		});
	});
};

//Logout
exports.logout = (req, res) => {
	res.clearCookie("token");
	res.status(200).json({
		message: "Sign Out Successfully",
	});
};

//Token generated is validated and the args passed is retrived in req.auth
exports.isSignedIn = expressJWT({
	secret: "secretCode",
	algorithms: ["HS256"],
	userProperty: "auth",
});

//To check the req.auth is same as req.user for verification
exports.isAuthenticated = (req, res, next) => {
	let check = req.auth && req.user && req.auth._id == req.user._id;
	if (!check) {
		return res.status(400).json({
			error: "Unauthorized Access",
		});
	}
	next();
};
