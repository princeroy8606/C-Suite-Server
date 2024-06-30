const User = require("../models/user");

exports.registerUser = async (req, res) => {
  const { name, authId, email } = req.body;
  try {
    const existingUser = await User.findOne(email);
    if (!existingUser) {
      const user = new User({
        name,
        authId,
        email,
      });
      await user.save();
      res.status(200).json(user);
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(400).json(error);
  }
};
