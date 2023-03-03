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
    const features = new APIFeatures(NFT.findOne({ sold: false }), req.query)
      .filter()
      .sort()
      .limitFeilds()
      .pagination();

    const allNFTs = await features.query;

    res.status(200).json({
      message: "Success",
      results: allNFTs?.length,
      data: { nfts: allNFTs },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getUsersNft = async (req, res) => {
  try {
    const account = req.params?.account;

    const createdFeatures = new APIFeatures(
      NFT.findOne({ seller: account }),
      req.query
    )
      .filter()
      .sort()
      .limitFeilds()
      .pagination();

    const created = await createdFeatures.query;

    const favoriteFeatures = new APIFeatures(
      NFT.findOne({
        wishlist: account.toLowerCase(),
      }),
      req.query
    )
      .filter()
      .sort()
      .limitFeilds()
      .pagination();

    const favorites = await favoriteFeatures.query;

    const collectedFeatures = new APIFeatures(
      NFT.findOne({ owner: account }),
      req.query
    )
      .filter()
      .sort()
      .limitFeilds()
      .pagination();

    const collected = await collectedFeatures.query;

    res.status(200).json({
      message: "Success",
      data: {
        nftsCreated: created,
        nftsCollected: collected,
        favorites: favorites,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const createNFT = async (req, res) => {
  try {
    const {
      name,
      tokenURI,
      tokenId,
      seller,
      owner,
      price,
      sold,
      collectionId,
    } = req.body;

    if (name && tokenURI && tokenId && seller && owner && price) {
      const response = await axios.get(tokenURI);
      const description = response?.data?.description;
      const media = response?.data?.media;
      const fileType = response?.data?.fileType;
      const category = response?.data?.category;

      const obj = {
        name,
        tokenURI,
        tokenId,
        seller: seller?.toLowerCase(),
        owner: owner?.toLowerCase(),
        price,
        description,
        collectionId,
        category,
        media,
        fileType,
        sold,
      };
      const exist = await NFT.findOne({
        tokenId,
        name,
        category,
        media,
        fileType,
        seller: seller?.toLowerCase(),
        owner: owner?.toLowerCase(),
        price,
        tokenURI,
      });

      let newNFT;
      if (exist) {
        newNFT = await NFT.updateOne({ tokenId }, obj);
      } else {
        newNFT = await NFT.create(obj);
      }

      res.status(200).json({
        status: "success",
        data: {
          nft: newNFT,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getByCategory = async (req, res) => {
  try {
    const category = req.params?.category;

    const data = new APIFeatures(NFT.findOne({ category }), req.query)
      .filter()
      .sort()
      .limitFeilds()
      .pagination();

    // const created = await createdFeatures.query;

    // const collectedFeatures = new APIFeatures(
    //   NFT.findOne({ owner: account }),
    //   req.query
    // )
    //   .filter()
    //   .sort()
    //   .limitFeilds()
    //   .pagination();

    const allNFTs = await data.query;

    res.status(200).json({
      message: "Success",
      data: { nfts: allNFTs },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getSingleNFT = async (req, res) => {
  try {
    const id = req.params.id;

    const nft = await NFT.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        nft,
        likes: nft.wishlist.length,
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

    const data = {
      tokenId: req.body?.tokenId,
      seller: req.body?.seller?.toLowerCase(),
      price: req.body?.price,
      owner: req.body?.owner?.toLowerCase(),
      sold: req.body?.sold,
    };

    const updatedNft = await NFT.updateOne({ tokenId }, data, {
      new: true,
      runValidators: true,
    });

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
    res.status(400).json({
      status: "faild",
      message: "file upload failed",
    });
  }
};

export const uploadNftToIPFS = async (req, res) => {
  try {
    const { name, description, media, fileType, category } = req.body;

    if ((name && description && media, fileType && category)) {
      const data = { name, description, media, fileType, category };

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

// For like and dislike the post of NFT
export const likeOrDislike = async (req, res) => {
  const { account, id } = req.body;
  const accountIdInLowercase = account.toLowerCase();

  try {
    const nftPost = await NFT.findOne({ _id: id });
    if (nftPost.wishlist.includes(accountIdInLowercase)) {
      await NFT.updateOne(
        { _id: id },
        { $pull: { wishlist: accountIdInLowercase } }
      );
      res
        .status(200)
        .json({ status: "success", message: "post disliked successfully" });
    } else {
      await NFT.updateOne(
        { _id: id },
        { $push: { wishlist: accountIdInLowercase } }
      );
      res
        .status(200)
        .json({ status: "success", message: "post liked successfully" });
    }
  } catch (e) {
    res.status(400).json({ status: "fail", message: "something gone wrong" });
  }
};
