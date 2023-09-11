import Joi from 'joi';

const userRegisterValidationSchema = Joi.object({
  name: Joi.string()
    .lowercase() // ensures the string is lowercase
    .regex(/^[a-z]+$/) // only allows alphabets
    .required(),

  email: Joi.string()
    .email() // ensures valid email format
    .lowercase() // ensures the string is lowercase
    .required(),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/)
    // requires at least one lowercase letter, one uppercase letter,
    // one digit, one special character, and the string to be at least 8 characters long
    .required(),

//   confirmPassword: Joi.string()
//     .valid(Joi.ref('password')) // ensures it matches the password field
//     .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/)
//     // same pattern as password
//     .required(),
});

const userLoginValidationSchema = Joi.object({
  email: Joi.string()
    .email() // ensures valid email format
    .lowercase() // ensures the string is lowercase
    .required(),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/)
    // requires at least one lowercase letter, one uppercase letter,
    // one digit, one special character, and the string to be at least 8 characters long
    .required(),
});

export { userRegisterValidationSchema, userLoginValidationSchema };
