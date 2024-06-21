const express = require("express");
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  testAnswers: [{ type: Object }],
  score:{type:Number}
});

const Answers = mongoose.model("Answers", answerSchema);
module.exports = Answers;
