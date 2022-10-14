const Joi = require("joi");

const commonStringSchema = Joi.string().min(2).max(45).required();

const registerSchema = Joi.object({
  user_first_name: commonStringSchema,
  user_last_name: commonStringSchema,
  user_email: Joi.string().email().required(),
  user_site_username: commonStringSchema,
  user_password: commonStringSchema,
});

export function validateRegisterMiddleware(req, res, next) {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(403).json({ message: `invalid data: ${error?.details[0]?.message}` });
  else next();
}