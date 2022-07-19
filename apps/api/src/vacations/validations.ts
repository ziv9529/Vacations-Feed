const Joi = require("joi");

const vacationScheme = Joi.object({
  vacation_destination: Joi.string().min(1).max(45).required(),
  vacation_description: Joi.string().min(1).max(100).required(),
  vacation_start_date: Joi.string().min(9).max(11).required(),
  vacation_end_date: Joi.string().min(9).max(11).required(),
  vacation_cost: Joi.number().min(1).max(9999999).required(),
  vacation_image: Joi.string().required()
});
export function isValidAddVacationData(data: any): boolean {
  const { error } = vacationScheme.validate(data);
  if (error) return false
  else return true
}