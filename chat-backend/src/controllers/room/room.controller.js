import { Room } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const allRoom = async (req, res) => {
  try {
    const room = await Room.findAll();
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
