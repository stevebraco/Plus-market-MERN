import data from "../data.js";
import bcrypt from "bcryptjs";
import express from "express";
import User from "../models/userModel.js";
import { generateToken } from "../utlis.js";

const userRouter = express.Router();

userRouter.get("/seed", async (req, res) => {
  const createdUsers = await User.insertMany(data.users);
  try {
    res.send({ createdUsers });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  try {
    res.send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

userRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try {
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      createdAt: createdUser.createdAt,
      token: generateToken(createdUser),
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});



export default userRouter;
