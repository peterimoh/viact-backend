const Joi = require('joi');
exports.Register = (userObj) => {

  const schema = Joi.object({
    id: Joi.allow(),

    email: Joi.string().email().required(),
    password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
    repeat_password: Joi.ref("password"),

  });
    let result = schema.validate(userObj);
    return result;
}