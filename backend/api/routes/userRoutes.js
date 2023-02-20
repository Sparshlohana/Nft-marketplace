import {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

import express from "express";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

export default router;
