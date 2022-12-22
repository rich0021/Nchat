const Joi = require("joi");

export const getOtherUserProfile = {
  body: {
    userId: Joi.number().required(),
  },
};

export const changePassword = {
  body: {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  },
};

export const register = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};

export const login = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};
