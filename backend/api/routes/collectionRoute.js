import express from "express";
import {
  createCollection,
  getCollection,
  getCollectionByCategory,
  getCollectionsOfUser,
  getNftsFromCollection,
} from "../controller/collectionController.js";
import { verify } from "../middlewares/verifySignature.js";

const router = express.Router();

router.post("/", verify, createCollection);

router.get("/", getCollection);

router.get("/categories/:category", getCollectionByCategory);

router.get("/:id", getNftsFromCollection);

router.get("/user/:account", verify, getCollectionsOfUser);

export default router;
