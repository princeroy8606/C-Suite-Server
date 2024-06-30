const User = require("../models/user");

exports.registerUser = async (req, res) => {
  const { name, authId, email } = req.body;
  try {
    const user = new User({
      name,
      authId,
      email,
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

