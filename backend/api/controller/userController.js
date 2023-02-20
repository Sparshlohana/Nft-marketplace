export const getAllUsers = (req, res) => {
  res.status(200).json({
    message: "Success",
    data: "users data",
  });
};
// 0x282bfebb74dd99d231274c973f800b71a4b604ff27c9e56fa69fb30bb05a891b
export const createUser = async (req, res) => {
  try {
    const web3 = req.web3;

    // const obj = await web3.eth.accounts.create();

    const obj1 = await web3.eth.accounts.privateKeyToAccount(
      "282bfebb74dd99d231274c973f800b71a4b604ff27c9e56fa69fb30bb05a891b"
    );

    const obj2 = await web3.eth.accounts.create();

    const wallet1 = await web3.eth.accounts.wallet.add(obj1);

    const wallet2 = await web3.eth.accounts.wallet.add(obj2);

    const transaction = await wallet2.signTransaction({
      to: wallet1.address,
      value: "100",
      gas: 2000000,
      gasPrice: "22000",
      nonce: 0,
      chainId: 1,
    });

    const confirmTx = await web3.eth.sendSignedTransaction(
      transaction.rawTransaction
    );

    console.log(confirmTx);

    const obj1balance = await web3.eth.getBalance(wallet1.address);
    const obj2balance = await web3.eth.getBalance(wallet2.address);

    console.log("balacne of obj1 ", obj1balance);
    console.log("balacne of obj2 ", obj2balance);

    res.status(200).json({
      message: "user created Successfully",
    });
  } catch (error) {
    console.log(error);
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
