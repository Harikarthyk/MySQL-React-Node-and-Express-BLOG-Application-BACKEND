const mysql = require("mysql");

exports.db = mysql.createPool({
	host: "db4free.net",
	user: "hari_user_1",
	password: "uTQ2vXwrr!9*V9H",
	database: "hari_blog_1",
	port: 3306,
});
