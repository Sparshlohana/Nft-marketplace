import Collection from "../models/collectionModel.js";
import NFT from "../models/nftSchema.js";
import APIFeatures from "../utils/apiFeatures.js";

export const createCollection = async (req, res) => {
  const { collectionName, collectionDescription, image, creator } = req.body;

  try {
    if (collectionName && collectionDescription && image && creator) {
      const data = await Collection.create(req.body);

      res.status(200).json({ status: "success", data });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "couldn't create collection" });
  }
};

export const getCollection = async (req, res) => {
  try {
    const collections = await Collection.find();

    res.status(200).json({
      status: "success",
      collections,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong while fetching collections",
    });
  }
};

export const getNftsFromCollection = async (req, res) => {
  const id = req.params.id;

  try {
    const exist = await Collection.findById(id);

    if (exist) {
      const nfts = new APIFeatures(
        NFT.find({ collectionId: id, sold: false }),
        req.query
      )
        .filter()
        .sort()
        .limitFeilds()
        .pagination();

      const allNfts = await nfts.query;

      const totalVolume = await NFT.aggregate([
        { $match: { sold: false } },
        {
          $group: {
            _id: "",
            Amount: { $sum: "$price" },
            avg: { $avg: "$price" },
          },
        },
        {
          $project: {
            _id: 0,
            TotalAmount: "$Amount",
            avg: "$avg",
          },
        },
      ]);

      res.status(200).json({
        status: "success",
        nfts: allNfts,
        collection: exist,
        total: totalVolume,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong while fetching collection nfts",
    });
  }
};

export const getCollectionsOfUser = async (req, res) => {
  const account = req.params.account;
  try {
    const collections = await Collection.find({
      creator: account?.toLowerCase(),
    });

    res.status(200).json({ status: "success", collections });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong while fetching collection of user",
    });
  }
};
