import NFT from "../models/nftSchema.js";

import APIFeatures from "../utils/apiFeatures.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
import * as IPFS from "ipfs-http-client";

const auth =
  "Basic " +
  Buffer.from(
    process.env.PROJECT_ID + ":" + process.env.PROJECT_SECRET
  ).toString("base64");

const subdomain = process.env.SUBDOMAIN;

const client = IPFS.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

export const aliasTopNFTs = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,difficulty";
  next();
};

export const getAllNFTs = async (req, res) => {
  try {
    const features = new APIFeatures(NFT.find(), req.query)
      .filter()
      .sort()
      .limitFeilds()
      .pagination();

    const allNFTs = await features.query;
    // console.log(allNFTs);
    res.status(200).json({
      message: "Success",
      results: allNFTs?.length,
      data: { nfts: allNFTs },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const createNFT = async (req, res) => {
  try {
    const { name, tokenURI, tokenId, seller, owner, price, sold } = req.body;

    if (name && tokenURI && tokenId && seller && owner && price) {
      const response = await axios.get(tokenURI);
      const description = response?.data?.description;
      const media = response?.data?.media;
      const fileType = response?.data?.fileType;

      const obj = {
        name,
        tokenURI,
        tokenId,
        seller,
        owner,
        price,
        description,
        media,
        fileType,
        sold,
      };
      console.log(obj);

      const exist = await NFT.findOne({
        tokenId,
        name,
        description,
        media,
        fileType,
        seller,
        owner,
        price,
        tokenURI,
      });
      let newNFT;
      if (exist) {
        newNFT = await NFT.updateOne({ tokenId }, obj);
        console.log("update", newNFT);
      } else {
        newNFT = await NFT.create(obj);
        console.log("create", newNFT);
      }

      res.status(200).json({
        status: "success",
        data: {
          nft: newNFT,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getSingleNFT = async (req, res) => {
  try {
    const id = req.params.id;
    const nft = await NFT.findById(id);
    console.log(nft);

    res.status(200).json({
      status: "success",
      data: {
        nft,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updateNFT = async (req, res) => {
  try {
    const tokenId = req.params.id;
    const data = req.body;

    const updatedNft = await NFT.updateOne({ tokenId }, data, {
      new: true,
      runValidators: true,
    });
    console.log(updateNFT);
    res.status(200).json({
      status: "success",
      data: {
        nft: updatedNft,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteNFT = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNft = await NFT.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      data: {
        nft: deletedNft,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getNFTsStats = async (req, res) => {
  try {
    const stats = await NFT.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numNft: { $sum: 1 },
          numRatings: { $sum: "ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      { $sort: { ratingsAverage: 1 } },
    ]);

    res.status(200).json({
      status: "success",
      data: { stats },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getMonthlyStats = async (req, res) => {
  try {
    const year = req.params?.year * 1;
    const stats = await NFT.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numNFTStarts: { $sum: 1 },
          nfts: { $push: "$name" },
        },
      },
      {
        $addFields: {
          month: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      { $sort: { numNFTStarts: -1 } },
    ]);
    res.status(200).json({
      status: "success",
      result: stats.length,
      data: { stats },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const uploadImgToIPFS = async (req, res) => {
  try {
    const imageFile = req.file.buffer;

    if (imageFile) {
      const added = await client.add({ content: imageFile });

      const url = `https://${subdomain}.infura-ipfs.io/ipfs/${added.path}`;

      res.status(200).json({
        status: "success",
        url,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "faild",
      message: "file upload failed",
    });
  }
};

export const uploadNftToIPFS = async (req, res) => {
  try {
    const { name, description, media, fileType } = req.body;

    if ((name && description && media, fileType)) {
      const data = { name, description, media, fileType };

      const added = await client.add(JSON.stringify(data));

      const url = `https://${subdomain}.infura-ipfs.io/ipfs/${added.path}`;

      res.status(200).json({
        status: "success",
        url,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "missing fields name , image or description ",
      });
    }
  } catch (error) {
    res
      .stats(200)
      .json({ status: "fail", message: "couldn't upload nft to ipfs" });
  }
};

// const checkId = (req, res, next, value) => {
//   console.log("ID: ", value);
//   if (req.params.id == 3) {
//     return res.status(404).json({ staus: "fail", message: "Invalid ID" });
//   }
//   next();
// };

// const checkBody = (req, res, next) => {
//   if (!req.body.name && !req.body.price) {
//     return res
//       .status(404)
//       .json({ status: "fail", message: "missing name and price" });
//   }
//   next();
// };
