const mysql = require("mysql");

exports.db = mysql.createPool({
	host: "sql12.freesqldatabase.com",
	user: "sql12381477",
	password: "Pmk1IYE855",
	database: "sql12381477",
	port: 3306,
});
