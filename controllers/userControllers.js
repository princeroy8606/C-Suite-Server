const { default: axios } = require("axios");
const User = require("../models/user");

const clientId = "86aue2n06v0823";
const clientSecret = "L7YBEDGd4b08vFEe";
const redirectUri = "https://csuite-auth.netlify.app/auth-linkedin-bridge";

exports.registerUser = async (req, res) => {
  let { name, authId, email, methord, Code } = req.body;
  console.log(Code);
  if (methord === "linkedin") {
    console.log("execution-start");
    try {
      const { data } = await axios.post(
        "https://www.linkedin.com/oauth/v2/accessToken",
        null,
        {
          params: {
            grant_type: "authorization_code",
            code: Code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("data-token", data);
      if (data) {
        const response = await axios.get(
          "https://api.linkedin.com/v2/userinfo",
          {
            headers: { Authorization: `Bearer ${data.access_token}` },
          }
        );
        if (response?.data) {
          (name = response?.data?.name),
            (email = response?.data?.email),
            (authId = response?.data?.sub);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  try {
    console.log("execute");
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const user = new User({
        name,
        authId,
        email,
      });
      console.log(user);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(200).json({ ok: true });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
