import { RoomMember, Room, Message } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const allRoomMember = async (req, res) => {
  try {
    const roommember = await RoomMember.findAll();
    successResponse(req, res, roommember);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const filteredRoomMember = async (req, res) => {
  try {
    const roommember = await RoomMember.findAll({
      where: req.body.data,
    });
    successResponse(req, res, roommember);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addRoomMember = async (req, res) => {
  try {
    const roommember = await RoomMember.create(req.body.data);
    successResponse(req, res, roommember);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateRoomMember = async (req, res) => {
  try {
    const update = await RoomMember.update(req.body.data, {
      where: {
        id: req.body.oldId,
      },
    });
    const roommember = await room.findOne({
      where: {
        id: update,
      },
    });
    successResponse(req, res, roommember);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const destroyRoomMember = async (req, res) => {
  try {
    await RoomMember.destroy({
      where: {
        id: req.body.oldId,
      },
    });
    successResponse(req, res, "Room Member Deleted");
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
