const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRouter");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("connected");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(5000, () => {
      console.log("db-connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/test", testRoutes);
app.use("/user", userRoutes);
