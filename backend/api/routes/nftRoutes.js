import express from "express";
import {
  aliasTopNFTs,
  createNFT,
  deleteNFT,
  getAllNFTs,
  getMonthlyStats,
  getNFTsStats,
  getSingleNFT,
  getUsersNft,
  updateNFT,
  uploadImgToIPFS,
  uploadNftToIPFS,
} from "../controller/nftController.js";

import multer from "multer";

const upload = multer();

const router = express.Router();

router.get("/user/:account", getUsersNft);

router.route("/nfts-stats").get(getNFTsStats);

router.post("/uploadToIPFS", upload.single("media"), uploadImgToIPFS);

router.post("/uploadNFT", uploadNftToIPFS);

router.route("/monthly-stats/:year").get(getMonthlyStats);

router.route("/top-5-nfts").get(aliasTopNFTs, getAllNFTs);

router.route("/").get(getAllNFTs).post(createNFT);

router.route("/:id").get(getSingleNFT).patch(updateNFT).delete(deleteNFT);

export default router;
