const Joi = require("joi");

// Define Joi schema for request body validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Middleware function to validate request body using Joi schema
const validateLogin = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message.toString();
    res.status(422).json({ error: errorMessage });
  }
  next();
};

module.exports = { validateLogin };
