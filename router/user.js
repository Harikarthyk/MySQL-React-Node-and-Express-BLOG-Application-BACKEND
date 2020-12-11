const express = require("express");
const {getUserById} = require("../controller/auth");
const {getUserInfo} = require("../controller/user");

const router = express.Router();

router.param("userId", getUserById);

router.get("/user_info/:userId", getUserInfo);

module.exports = router;
