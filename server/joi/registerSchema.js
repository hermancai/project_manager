const Joi = require("joi");

// Form validation for registering new users
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(25).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be 2 to 25 characters",
    "string.max": "Username must be 2 to 25 characters",
    "string.alphanum": "Username cannot contain special characters",
    "any.required": "Username is required",
  }),
  password: Joi.string().required().min(3).max(25).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be 2 to 25 characters",
    "string.max": "Password must be 2 to 25 characters",
    "any.required": "Password is required",
  }),
});

module.exports = registerSchema;
