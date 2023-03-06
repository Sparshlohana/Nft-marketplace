import User from "../models/userModel.js";

export const getAllUsers = (req, res) => {
  res.status(200).json({
    message: "Success",
    data: "users data",
  });
};

export const createUser = async (req, res) => {
  const account = req.body.account;
  try {
    if (account) {
      const user = await User.findOne({ account: account });

      if (!user) {
        const newUser = await User.create({ account: account });

        res.status(200).send({
          status: "success",
          message: "User created successfully",
        });
      } else {
        res.status(200).send({
          status: "failed",
          message: "User alrealdy exist",
        });
      }
    } else {
      res
        .status(500)
        .json({ status: "failed", message: "User account not specified" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const getSingleUser = (req, res) => {
  res.status(200).json({
    message: "Single User Data",
  });
};

export const updateUser = (req, res) => {
  res.status(200).json({
    message: "successfully updated User",
  });
};

export const deleteUser = (req, res) => {
  res.status(200).json({
    message: "successfully User deleted",
  });
};
