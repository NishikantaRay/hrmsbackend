import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req) => {
  console.log("phone", req.validatedBody.phoneNumber);
  let userData = await User.find({
    phoneNumber: req.validatedBody.phoneNumber,
  });
  let userDataEmail = await User.find({ email: req.validatedBody.email });
  console.log("userData", userData);
  console.log("userDataEmail", userDataEmail);
  if (!userData.length && !userDataEmail.length) {
    const passwordHash = await bcrypt.hash(req.validatedBody.password, 10);
    req.validatedBody.password = passwordHash;
    let newUser = new User({
      ...req.validatedBody,
    });
    const userDetails = await newUser.save();
    return {
      message: "added successfully",
      code: 201,
      data: userDetails,
    };
  } else
    return {
      message: "user already registered",
      code: 400,
      data: {},
    };
};

export const userLogin = async (req) => {
  console.log("xd", req);
  let userData = await User.findOne({
    $or: [
      { email: req.validatedBody.value },
      { userName: req.validatedBody.value },
    ],
  });
  userData.updateLastLogin();
  // let userData = await User.findOne({ email: req.validatedBody.email })
  if (userData) {
    let passwordVerify = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (passwordVerify) {
      const payload = { email: userData.email, userId: userData._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return {
        token: token,
        userId: userData._id,
        message: "Login sucess",
        code: 200,
      };
    } else
      return {
        data: {},
        message: "Wrong Password",
        code: 403,
      };
  } else
    return {
      data: {},
      message: "No such user found",
      code: 403,
    };
};

export const userUpdateProfile = async (req) => {
  req.body.profile_updated_at = Date.now();
  let userData = await User.findOneAndUpdate(
    { _id: req.user._id },
    { ...req.body },
    { new: true }
  );
  return {
    message: "updated successfully",
    code: 200,
    data: userData,
  };
};
