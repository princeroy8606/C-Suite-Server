const express = require("express");

const router = express.Router();

const userControll = require("../controllers/userControllers");

router.post("/new", userControll.registerUser);

module.exports = router;
