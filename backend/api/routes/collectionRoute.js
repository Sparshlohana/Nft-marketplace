import express from "express";
import {
  createCollection,
  getCollection,
  getCollectionsOfUser,
  getNftsFromCollection,
} from "../controller/collectionController.js";

const router = express.Router();

router.post("/", createCollection);

router.get("/", getCollection);

router.get("/:id", getNftsFromCollection);

router.get("/user/:account", getCollectionsOfUser);

export default router;
