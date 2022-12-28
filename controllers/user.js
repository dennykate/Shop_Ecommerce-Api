import User from "../models/user.js";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const signUp = async (req, res) => {
  const { firstName, lastName, birthDate, region, gender, email, password } =
    req.body;

  if (!firstName || !email || !password) {
    return res.status(400).json({
      message: "require all data",
    });
  }

  const id = uuidv4();
  const newPassword = crypto.createHash("md5").update(password).digest("hex");

  try {
    const isUserExists = await User.find({
      email,
    });

    if (isUserExists.length > 0) {
      return res.status(400).json({ message: "user already exists" });
    }

    const newUser = new User({
      id,
      firstName,
      lastName,
      birthDate,
      region,
      gender,
      email,
      password: newPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "signup successfull",
      data: newUser,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  const newPassword = crypto.createHash("md5").update(password).digest("hex");

  try {
    const userLogIn = await User.find({
      email,
      password: newPassword,
    });

    if (userLogIn.length == 0)
      return res.status(400).json({ message: "wrong information" });

    return res.status(200).json({
      message: "login successfull",
      data: userLogIn,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
