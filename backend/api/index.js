import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
// internal imports

import nftRoute from "./routes/nftRoutes.js";
import userRoute from "./routes/userRoutes.js";

// config dotenv
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.dirname(__filename) + "/nft-data/img"));

//routes
app.use("/api/v1/nfts", nftRoute);
app.use("/api/v1/users", userRoute);

const PORT = process.env.PORT || 5000;

const DB = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "can't find " + req.originalUrl,
  });
});

mongoose.set("strictQuery", true);
mongoose.connect(DB, { useNewUrlParser: true }).then(async (con) => {
  console.log("db connection established");
  app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
});
