import mongoose from "mongoose";
import slugify from "slugify";

const nftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide a name"],
    },
    tokenId: {
      type: Number,
      required: [true, "must provide a token Id"],
    },
    price: {
      type: Number,
      required: [true, "must provide a price"],
    },
    owner: {
      type: String,
      required: [true, "must provide a owner address"],
    },
    seller: {
      type: String,
      required: [true, "must provide a seller address"],
    },
    tokenURI: {
      type: String,
      required: [true, "must provide a token URI"],
    },
    sold: {
      type: Boolean,
    },
    // duration: {
    //   type: String,
    //   required: [true, "must provide a duration"],
    // },
    slug: String,
    // maxGroupSize: {
    //   type: Number,
    //   required: [true, "must have a group size"],
    // },

    // difficulty: {
    //   type: String,
    //   required: [true, "must have a difficulty"],
    // },

    // ratingsAverage: {
    //   type: Number,
    //   default: 0,
    // },

    // ratingsQuantity: {
    //   type: Number,
    //   default: 0,
    // },

    // summary: {
    //   type: String,
    //   trim: true,
    //   required: [true, "must provide a summary"],
    // },

    // priceDiscount: { type: Number, default: 0 },

    // description: { type: String, trim: true },

    // imageCover: {
    //   type: String,
    //   required: [true, "must provide a cover image"],
    // },

    // images: [String],

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
  }
);

nftSchema.virtual("durationWeeks").get(function () {
  return Math.floor(this.duration / 7);
});

nftSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const NFT = mongoose.model("NFT", nftSchema);

export default NFT;