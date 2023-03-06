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
import { verify } from "../middlewares/verifySignature.js";

const upload = multer();

const router = express.Router();

router.get("/", getAllNFTs);

router.post("/", verify, createNFT);

router.get("/user/:account", verify, getUsersNft);

router.get("/nfts-stats", verify, getNFTsStats);

router.post("/favorites", verify, likeOrDislike);

router.post("/uploadToIPFS", verify, upload.single("media"), uploadImgToIPFS);

router.post("/uploadNFT", verify, uploadNftToIPFS);

router.get("/monthly-stats/:year", verify, getMonthlyStats);

router.get("/top-5-nfts", aliasTopNFTs, getAllNFTs);

router.get("/:id", getSingleNFT);

router.patch("/:id", verify, updateNFT);

router.delete("/:id", verify, deleteNFT);

router.post("/pusblishOrUnpublish/:id", verify, publishOrUnpublishNFT);

export default router;
