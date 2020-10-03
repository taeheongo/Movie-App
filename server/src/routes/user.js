import express from "express";
import axios from "axios";
import { User } from "../dataSources/models/User";

const router = express.Router();

router.get("/auth/github", async (req, res, next) => {
  const { code } = req.query;
  console.log(code);

  if (!code) {
    return res.status(401).json({
      success: false,
      message: "No code error",
    });
  }

  let response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }
  );

  const tokenObject = {};

  // parse String token to Object.
  response.data.split("&").forEach((elem) => {
    const parsedData = elem.match(/(.*)=(.*)?/);
    const key = parsedData[1];
    const value = parsedData[2];

    tokenObject[key] = value;
  });

  let token = tokenObject["access_token"];

  response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  let userAccount = response.data;

  let user = await User.findOne({
    githubId: "" + userAccount.id,
  });

  if (!user) {
    user = new User({
      username: userAccount.name,
      email: userAccount.email || "" + userAccount.id,
      githubId: "" + userAccount.id,
    });

    await user.save();
  }

  user = await user.generateToken();

  res
    .cookie("githubToken", tokenObject["access_token"])
    .cookie("token", user.token)
    .redirect("http://localhost:3000/");
});

export default router;
