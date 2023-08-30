import express from "express";
const router = express.Router();
import {
  newUserValidator,
  loginValidator,
} from "../Validators/joi.validator.js";
import { userRegister, userLogin } from "../controllers/user.controller.js";
import { userUpdateProfile } from "../controllers/user.controller.js";

import { authorizeUser } from "../middleware/authMiddleware.js";

router.post("/register", newUserValidator, userRegister);
router.post("/login", loginValidator, userLogin);
router.put("/updateProfile", authorizeUser, userUpdateProfile);

export default router;
