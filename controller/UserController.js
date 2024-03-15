import UserModel from "../model/UserModel.js";
import { comparePassword, hashedPassword } from "../helper/UserHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ error: " Name is required" });
    }
    if (!email) {
      return res.send({ error: " Email is required" });
    }
    if (!password) {
      return res.send({ error: " Password is required" });
    }
    if (!phone) {
      return res.send({ error: " Phone is required" });
    }
    if (!address) {
      return res.send({ error: " Address is required" });
    }

    // check for existing user
    console.log(req.body);
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.send({
        success: false,
        message: "User already exists Please Login",
      });
    }

    //    Hashedpassword

    const hashPassword = await hashedPassword(password);

    // new user

    const user = await new UserModel({
      name,
      email,
      password: hashPassword,
      phone,
      address,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration ",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      user:{
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in login ",
      error,
    });
  }
};
