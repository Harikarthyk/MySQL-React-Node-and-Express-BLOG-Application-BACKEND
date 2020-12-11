const express = require("express");
const {registerUser, login, logout} = require("../controller/auth");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;
