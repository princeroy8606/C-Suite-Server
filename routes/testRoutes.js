const express = require("express");

const router = express.Router();
const Test = require("../controllers/testControllers");

router.get("/questions", Test.fetchQuestions);
router.get("/user", Test.user);
router.post("/answer", Test.submitAnswer);

module.exports = router;
