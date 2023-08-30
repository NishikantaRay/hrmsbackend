import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authorizeUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("No token provided");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error("No such user found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
