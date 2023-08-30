import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    userName: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      default: "user",
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    regisration_date: {
      type: Date,
      default: Date.now,
    },
    uuid: {
      type: String,
      default: uuidv4(),
    },
    last_login: {
      type: Date,
      default: Date.now,
    },
    profile_updated_at: {
      type: Date,
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.methods.updateLastLogin = function () {
  this.last_login = Date.now();
  return this.save();
};

const User = mongoose.model("User", userSchema);
export default User;
