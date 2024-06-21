const Answers = require("../models/answers");
const Questions = require("../models/questions");
const User = require("../models/user");

exports.fetchQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.submitAnswer = async (req, res) => {
  const { selectedOptions, questionData, username } = req.body;
  let score = 0;
  for (const answer in selectedOptions) {
    let section = Number(answer[0]);
    let question = Number(answer[2]);
    if (
      questionData.sections[section]?.questions[question]?.answer ===
      selectedOptions[answer]
    )
      score += 1;
  }

  try {
     const user = await User.findOne({name:username})
    const answer = new Answers({userId:user?._id,testAnswers:selectedOptions,score});
    await answer.save();
    console.log(answer)
    res.status(200).json(true);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.user = async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
};
