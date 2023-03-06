import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import axios from "../utils/axios";

import Web3Modal from "web3modal";

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./contanst";
import { useNavigate } from "react-router-dom";
import { generateAuthToken } from "../utils/generateToken";

export const NFTMarketplaceContext = createContext();

const NFTMarketplaceProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const getProvider = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    return provider;
  };

  const getSigner = async () => {
    const provider = await getProvider();
    const signer = provider.getSigner();

    return signer;
  };

  // fetch Contract
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
      NFTMarketplaceAddress,
      NFTMarketplaceABI,
      signerOrProvider
    );

  //connecting to smart contract

  const connectingWithSmartContract = async () => {
    try {
      const provider = await getProvider();
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      return contract;
    } catch (error) {
      setIsError(true);
      setError("Internal Server Error!");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        setIsError(true);
        setError("install metamask");
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      setIsError(true);
      setError("wallet can't connect");
    }
  };

  const connectWallet = async () => {
    try {
      const signer = await getSigner();

      if (!window.ethereum) {
        setIsError(true);
        setError("install metamask");
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);

        const token = await generateAuthToken(signer, accounts[0]);

        await axios.post("/api/v1/users", {
          account: accounts[0],
        });

        localStorage.setItem("token", token);
      }
      setIsSuccess(true);
      setSuccessMsg("Wallet Connected!");
      navigate(window.location.pathname);
    } catch (error) {
      setError("wallet can't connect");
      setIsError(true);
    }
  };

  const createNFT = async (
    name,
    price,
    media,
    fileType,
    description,
    collectionData
  ) => {
    try {
      if (!name && !description && !media && !fileType && !price) {
        setIsError(true);
        setError("Missing required fields!");
      }

      const data = { name, description, media, fileType };

      const token = localStorage.getItem("token");

      const response = await axios.post("/api/v1/nfts/uploadNFT", data, {
        headers: {
          Authorization: token,
        },
      });

      const url = response.data.url;

      if (url) {
        await createSale(url, price, name, false, 0, collectionData);
      }
    } catch (error) {
      setError("Missing required felids");
      setIsError(true);
    }
  };

  const withdrawn = async () => {
    const contract = await connectingWithSmartContract();
    const res = await contract.withdrawn();
  };

  const createSale = async (
    url,
    formInputPrice,
    name,
    isReselling,
    id,
    collectionData
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (isReselling === false) {
        const contract = await connectingWithSmartContract();

        const price = ethers.utils.parseUnits(formInputPrice, "ether");

        const listingPrice = await contract.getListingPrice();

        const transaction = await contract.createToken(url, price, {
          value: listingPrice.toString(),
        });

        let collectionId = "";

        if (collectionData !== undefined || collectionData !== null) {
          if (collectionData?.created === false) {
            const res = await axios.post(
              "/api/v1/collections",
              {
                ...collectionData,
                creator: currentAccount?.toLowerCase(),
              },
              {
                headers: { Authorization: token },
              }
            );

            collectionId = res?.data?.data?._id;
          } else {
            collectionId = collectionData?._id;
          }
        }

        contract.on(
          "MarketItemCreated",
          async (tokenId, seller, owner, price, sold) => {
            const data = {
              name,
              tokenURI: url,
              tokenId: Number(String(tokenId)),
              seller,
              owner,
              price: Number(String(ethers.utils.formatUnits(price, "ether"))),
              sold,
              collectionId,
            };

            await axios.post("/api/v1/nfts", data, {
              headers: { Authorization: token },
            });
          }
        );

        await transaction.wait();

        setIsSuccess(true);
        setSuccessMsg("NFT Created Successfull!");

        navigate("/user");
      } else {
        const contract = await connectingWithSmartContract();

        const price = ethers.utils.parseUnits(formInputPrice, "ether");

        const listingPrice = await contract.getListingPrice();

        const transaction = await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });

        contract.on("resellEvent", async (tokenId, seller, owner, price) => {
          const data = {
            tokenId: Number(String(tokenId)),
            seller,
            owner,
            sold: false,
            price: Number(String(ethers.utils.formatUnits(price, "ether"))),
          };

          await axios.patch(
            `http://localhost:5000/api/v1/nfts/${tokenId}`,
            data,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        });

        transaction.wait();

        setIsSuccess(true);
        setSuccessMsg("NFT Resell Successful!");
        navigate("/user");
      }
    } catch (error) {
      setIsError(true);
      if (isReselling) {
        setError("Something went wrong while Reselling NFT !");
      } else {
        setError("Something went wrong while Creating NFT!");
      }
    }
  };

  //buy NFTs function
  const buyNft = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      contract.on("buyEvent", async (tokenId, seller, owner) => {
        const data = {
          tokenId: Number(String(tokenId)),
          seller: seller?.toLowerCase(),
          owner: owner?.toLowerCase(),
          price: nft.price,
          sold: true,
        };

        const token = localStorage.getItem("token");

        await axios.patch(
          `http://localhost:5000/api/v1/nfts/${tokenId}`,
          data,
          { headers: { Authorization: token } }
        );
      });

      await transaction.wait();
      setIsSuccess(true);
      setSuccessMsg("NFT Purchased Successfully");
      navigate("/user");
    } catch (error) {
      setIsError(true);
      setIsError("Something went wrong while purchasing NFT!");
    }
  };

  return (
    <>
      <NFTMarketplaceContext.Provider
        value={{
          connectingWithSmartContract,
          checkIfWalletIsConnected,
          connectWallet,
          currentAccount,
          createNFT,
          createSale,
          buyNft,
          setError,
          error,
          withdrawn,
          isError,
          successMsg,
          setSuccessMsg,
          setIsSuccess,
          isSuccess,
          setIsError,
        }}
      >
        {children}
      </NFTMarketplaceContext.Provider>
    </>
  );
};

export default NFTMarketplaceProvider;
