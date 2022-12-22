import express from "express";
import validate from "express-validation";

import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";

import * as messageController from "../controllers/message/message.controller";

import * as roomController from "../controllers/room/room.controller";

import * as roommemberController from "../controllers/roommember/roommember.controller";

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.post("/login", validate(userValidator.login), userController.login);
router.post(
  "/register",
  validate(userValidator.register),
  userController.register
);
router.get("/me", userController.profile);

router.get("/message", messageController.allMessage);
router.get("/message-filter", messageController.filteredMessage);
router.put("/message", messageController.updateMessage);
router.post("/message", messageController.addMessage);
router.delete("/message", messageController.destroyMessage);

router.get("/room", roomController.allRoom);
router.get("/room-filter", roomController.filteredRoom);
router.put("/room", roomController.updateRoom);
router.post("/room", roomController.addRoom);
router.delete("/room", roomController.destroyRoom);

router.get("/roommember", roommemberController.allRoomMember);
router.get("/roommember-filter", roommemberController.filteredRoomMember);
router.put("/roommember", roommemberController.updateRoomMember);
router.post("/roommember", roommemberController.addRoomMember);
router.delete("/roommember", roommemberController.destroyRoomMember);

/* router.post(
  "/changePassword",
  validate(userValidator.changePassword),
  userController.changePassword
); */

module.exports = router;
