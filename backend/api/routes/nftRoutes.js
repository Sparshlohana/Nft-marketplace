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
  likeOrDislike,
  updateNFT,
  uploadImgToIPFS,
  uploadNftToIPFS,
  publishOrUnpublishNFT,
} from "../controller/nftController.js";

import multer from "multer";

const upload = multer();

const router = express.Router();

router.get("/", getAllNFTs);

router.post("/", createNFT);

router.get("/user/:account", getUsersNft);

router.get("/nfts-stats", getNFTsStats);

router.post("/favorites", likeOrDislike);

router.post("/uploadToIPFS", upload.single("media"), uploadImgToIPFS);

router.post("/uploadNFT", uploadNftToIPFS);

router.get("/monthly-stats/:year", getMonthlyStats);

router.get("/top-5-nfts", aliasTopNFTs, getAllNFTs);

router.get("/:id", getSingleNFT);

router.patch("/:id", updateNFT);

router.delete("/:id", deleteNFT);

router.post("/pusblishOrUnpublish/:id", publishOrUnpublishNFT);

export default router;
