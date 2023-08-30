import Joi from "joi";

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string()
      .trim()
      .alphanum()
      .min(3)
      .max(25)
      .trim(true)
      .required(),
    email: Joi.string().trim().email().trim(true).required(),
    password: Joi.string().trim().min(4).trim(true).required(),
    phoneNumber: Joi.string()
      .trim()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    avatar: Joi.string().trim(),
    address: Joi.array().items(
      Joi.object().keys({
        city: Joi.string().trim(),
        state: Joi.string().trim(),
        pincode: Joi.string().trim(),
        isPrimary_add: Joi.boolean(),
      })
    ),

    // birthYear: Joi.number().integer().min(1920).max(2000),
    // skillSet: Joi.array().items(Joi.string().trim().alphanum().trim(true))
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().trim().min(4).trim(true).required(),
    value: Joi.string().trim().trim(true).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
