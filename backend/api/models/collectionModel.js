import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const collectionSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "must provide collection name"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "must provide nft description"],
  },
  creator: {
    type: String,
    required: [true, "must provide nft creator address"],
  },
});
