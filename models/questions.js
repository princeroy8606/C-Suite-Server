const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  questions: [{ type: Object }],
});

const Questions = mongoose.model("Questions", questionsSchema);
module.exports = Questions;
