const Joi = require("joi");

// Form validation for registering new users
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(25).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be 3 to 25 characters",
    "string.max": "Username must be 3 to 25 characters",
    "string.alphanum": "Username cannot contain special characters",
    "any.required": "Username is required",
  }),
  password: Joi.string().required().min(3).max(25).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be 3 to 25 characters",
    "string.max": "Password must be 3 to 25 characters",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Passwords do not match",
    "any.required": "Passwords do not match",
    "string.empty": "Passwords do not match",
  }),
});

module.exports = registerSchema;
