const fs = "fs");
const dotenv = "dotenv");
const mongoose = "mongoose");
const path = "path");
const NFT = "./../../models/nftSchema");

dotenv.config();

const DB = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB Connection Successfully");
  });

const nfts = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "..", "nft-data", "data", "nfts.json")
  ),
  "utf-8"
);

//IMPORT DATA
const importData = async () => {
  try {
    await NFT.create(nfts);
    console.log("DATA successfully Loaded");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//DELETE DATA
const deleteData = async () => {
  try {
    await NFT.deleteMany();
    console.log("DATA successfully Deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
