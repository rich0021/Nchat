import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const allUsers = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const users = await User.findAndCountAll({
      order: [
        ["createdAt", "DESC"],
        ["username", "ASC"],
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await User.scope("withSecretColumns").findOne({
      where: { username },
    });
    if (user) {
      throw new Error("Phone Number Already Registered");
    }
    const reqPass = crypto.createHash("md5").update(password).digest("hex");
    const payload = {
      username,
      password: reqPass,
    };
    const newUser = await User.create(payload);
    return successResponse(req, res, { user: newUser });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.scope("withSecretColumns").findOne({
      where: { username },
    });
    const reqPass = crypto
      .createHash("md5")
      .update(req.body.password || "")
      .digest("hex");
    if (!user || reqPass !== user.password) {
      throw new Error("Incorrect Phone Number / Password");
    }
    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          username: user.username,
          createdAt: new Date(),
        },
      },
      process.env.SECRET
    );
    delete user.dataValues.password;
    return successResponse(req, res, { user, token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const profile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ where: { id: userId } });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

/* export const changePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.scope("withSecretColumns").findOne({
      where: { id: userId },
    });

    const reqPass = crypto
      .createHash("md5")
      .update(req.body.oldPassword)
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Old password is incorrect");
    }

    const newPass = crypto
      .createHash("md5")
      .update(req.body.newPassword)
      .digest("hex");

    await User.update({ password: newPass }, { where: { id: user.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}; */
