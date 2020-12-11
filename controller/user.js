// const {db} = require("../config/db");

//get user info if req.user exists
exports.getUserInfo = (req, res) => {
	if (!req.user)
		return res.status(400).json({
			error: "Error in finding the user",
		});
	return res.status(200).json({
		user: req.user,
	});
};
