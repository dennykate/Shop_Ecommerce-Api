import User from "../models/user.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const signUp = async (req, res) => {
  const { firstName, lastName, birthDate, region, gender, email, password } =
    req.body;

  if (!firstName || !lastName || !email || !password) {
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
      success: true,
      message: "signup successful",
      user: newUser,
    });
  } catch (error) {
    return res.status({
      success: false,
      message: "signup fail",
    });
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
      return res.status(400).json({ success: false, message: "login fail" });
    else
      jwt.sign(
        {
          email: userLogIn[0].email,
          password: userLogIn[0].password,
        },
        "Mamathwethwe",
        {
          expiresIn: 604800,
        },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              message: err,
            });
          }

          return res.status(200).json({
            success: true,
            message: "login successful",
            user: userLogIn[0],
            token,
          });
        }
      );
  } catch (error) {
    return res.status({
      success: false,
      message: "login fail",
    });
  }
};
