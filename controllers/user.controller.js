import * as UserService from "../services/user.service.js";

export const userRegister = async (req, res, next) => {
  try {
    const data = await UserService.userRegister(req);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const data = await UserService.userLogin(req);
    res.status(data.code).json({
      code: data.code,
      token: data.token,
      userId: data.userId,
      message: data.message,
    });
  } catch (error) {
    next(error);
  }
};

export const userUpdateProfile = async (req, res, next) => {
  try {
    console.log("1", req.user);
    const data = await UserService.userUpdateProfile(req);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message,
    });
  } catch (error) {
    next(error);
  }
};
