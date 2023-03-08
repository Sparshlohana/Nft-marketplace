import Collection from "../models/collectionModel.js";
import NFT from "../models/nftSchema.js";
import APIFeatures from "../utils/apiFeatures.js";

export const createCollection = async (req, res) => {
  const {
    collectionName,
    collectionDescription,
    image,
    banner,
    creator,
    category,
  } = req.body;

  try {
    if (
      collectionName &&
      collectionDescription &&
      image &&
      banner &&
      creator &&
      category
    ) {
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
  const search = req.query.search;

  try {
    let collections = await Collection.find();

    if (req.query.search) {
      collections = await Collection.find({
        collectionName: { $regex: search, $options: "i" },
      });
    }

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

export const getCollectionByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    if (category) {
      const collections = await Collection.find({
        category: category,
      });

      res.status(200).json({ status: "success", collections: collections });
    } else {
      res
        .status(403)
        .json({ status: "failed", message: "category must be specified" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const getNftsFromCollection = async (req, res) => {
  const id = req.params.id;

  try {
    const exist = await Collection.findById(id);

    if (exist) {
      const nfts = new APIFeatures(
        NFT.find({ collectionId: id, sold: false, isPublished: true }),
        req.query
      )
        .filter()
        .sort()
        .limitFeilds()
        .pagination();

      const allNfts = await nfts.query;

      const totalVolume = await NFT.aggregate([
        { $match: { sold: false, isPublished: true, collectionId: id } },
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
  const search = req.query.search;
  try {
    let collections = await Collection.find({
      creator: account?.toLowerCase(),
    });

    if (req.query.search) {
      collections = await Collection.find({
        creator: account?.toLowerCase(),
        collectionName: { $regex: search, $options: "ig" },
      });
    }

    res.status(200).json({ status: "success", collections });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong while fetching collection of user",
    });
  }
};
