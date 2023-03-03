export const getAllUsers = (req, res) => {
  res.status(200).json({
    message: "Success",
    data: "users data",
  });
};
// 0x282bfebb74dd99d231274c973f800b71a4b604ff27c9e56fa69fb30bb05a891b
export const createUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "user created Successfully",
    });
  } catch (error) {}
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
