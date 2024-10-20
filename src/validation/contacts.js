import Joi from 'joi';
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).email(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .required(),
  isFavourite: Joi.boolean().optional().default(false),
});
export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20).email(),
  contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
  isFavourite: Joi.boolean(),
});
