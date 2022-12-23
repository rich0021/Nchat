import { Room, RoomMember, Message } from "../../models";
import { successResponse, errorResponse } from "../../helpers";
const { messageEvent } = require("../../events/index");

export const allRoom = async (req, res) => {
  try {
    const room = await Room.findAll({
      include: [
        {
          model: RoomMember,
          require: true,
          where: {
            userId: req.user.userId,
          },
          attributes: [],
        },
        {
          model: Message,
        },
      ],
    });
    successResponse(req, res, room);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const filteredRoom = async (req, res) => {
  try {
    const room = await Room.findAll({
      where: req.body.data,
    });
    successResponse(req, res, room);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body.data);
    successResponse(req, res, room);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const update = await Room.update(req.body.data, {
      where: {
        id: req.body.oldId,
      },
    });
    const room = await room.findOne({
      where: {
        id: update,
      },
    });
    successResponse(req, res, room);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const destroyRoom = async (req, res) => {
  try {
    await Room.destroy({
      where: {
        id: req.body.oldId,
      },
    });
    successResponse(req, res, "Room Deleted");
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
