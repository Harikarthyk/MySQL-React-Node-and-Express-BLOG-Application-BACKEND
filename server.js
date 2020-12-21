//Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Import custom routes
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const blogRoute = require("./router/blog");
const commentRoute = require("./router/comment");
const bookmarkRoute = require("./router/bookmark");
const {db} = require("./config/db");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Test route
app.get("/", (req, res) => {
	// let q = "DESC blog";
	// let q = "CREATE TABLE dislikes (dislike_id INT NOT NULL AUTO_INCREMENT ,user_id INT NOT NULL ,blog_id INT NOT NULL ,last_updated TIMESTAMP ,PRIMARY KEY (dislike_id) ,FOREIGN KEY(user_id) REFERENCES user(user_id) ,	FOREIGN KEY(blog_id) REFERENCES blog(blog_id) );";
	// let q = "CREATE TABLE likes (like_id INT NOT NULL AUTO_INCREMENT ,user_id INT NOT NULL ,blog_id INT NOT NULL ,last_updated TIMESTAMP ,PRIMARY KEY (like_id) ,FOREIGN KEY(user_id) REFERENCES user(user_id) ,FOREIGN KEY(blog_id) REFERENCES blog(blog_id) );";
	// let q = "CREATE TABLE bookmark(bookmark_id INT NOT NULL AUTO_INCREMENT  ,user_id INT NOT NULL ,blog_id INT NOT NULL ,PRIMARY KEY(bookmark_id) ,FOREIGN KEY(user_id) REFERENCES user(user_id) ,FOREIGN KEY(blog_id) REFERENCES blog(blog_id) );";
	// let q ="CREATE TABLE `comment`(comment_id INT NOT NULL AUTO_INCREMENT , user_id INT NOT NULL ,blog_id INT NOT NULL ,comment VARCHAR(255) NOT NULL ,last_updated TIMESTAMP ,PRIMARY KEY (comment_id) ,FOREIGN KEY(user_id) REFERENCES user(user_id) ,FOREIGN KEY(blog_id) REFERENCES blog(blog_id) );";
	// let q ="CREATE TABLE `blog`(blog_id INT NOT NULL AUTO_INCREMENT ,value TEXT NOT NULL ,user_id INT NOT NULL,heading VARCHAR(255) NOT NULL ,last_updated TIMESTAMP ,PRIMARY KEY(blog_id),FOREIGN KEY (user_id) REFERENCES user(user_id));";
	// let q = "CREATE TABLE `user`( user_id INT NOT NULL AUTO_INCREMENT , name VARCHAR(30) NOT NULL ,email VARCHAR(50) NOT NULL , 	password CHAR(225) NOT NULL ,last_updated TIMESTAMP ,PRIMARY KEY (user_id) ,UNIQUE (email) );";

	// db.query(q, (error, result) => {
	// 	console.error(error);
	// 	console.log(result);
	// });

	res.send("It is working successfully");
});

//Custom routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", blogRoute);
app.use("/api", commentRoute);
app.use("/api", bookmarkRoute);

//PORT server runs
const PORT = process.env.PORT || 5050;

//App listen's to the PORT
app.listen(PORT, () =>
	console.log(`Server is running at PORT ${PORT} Successfully`),
);
