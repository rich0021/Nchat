import { Message } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const allMessage = async (req, res) => {
  try {
    const message = await Message.findAll({
      include: ["Room", "User"],
    });
    successResponse(req, res, message);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const filteredMessage = async (req, res) => {
  try {
    const message = await Message.findAll({
      where: req.body.data,
    });
    successResponse(req, res, message);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addMessage = async (req, res) => {
  try {
    const Message = await Message.create(req.body.data);
    successResponse(req, res, Message);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateMessage = async (req, res) => {
  try {
    const update = await Message.update(req.body.data, {
      where: {
        id: req.body.oldId,
      },
    });
    const message = await Message.findOne({
      where: {
        id: update,
      },
    });
    successResponse(req, res, message);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const destroyMessage = async (req, res) => {
  try {
    await Message.destroy({
      where: {
        id: req.body.oldId,
      },
    });
    successResponse(req, res, "Message Deleted");
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
