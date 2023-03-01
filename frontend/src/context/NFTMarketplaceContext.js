import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import axios from "../utils/axios";

import Web3Modal from "web3modal";

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./contanst";
import { useNavigate } from "react-router-dom";

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
      console.log(signer);
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
        console.log("install metamask");
      }
      console.log(currentAccount);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }

      // console.log(currentAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log("install metamask");
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
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
    category,
    collectionData
  ) => {
    try {
      if (!name && !description && !media && !fileType && !price && !category) {
        setIsError(true);
        setError("Missing required fields!");
      }

      const data = { name, description, media, fileType, category };

      const response = await axios.post("/api/v1/nfts/uploadNFT", data);

      const url = response.data.url;

      if (url) {
        await createSale(url, price, name, false, 0, collectionData);
      }
    } catch (error) {
      setError("Missing required felids");
      setIsError(true);
    }
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
      if (isReselling === false) {
        const contract = await connectingWithSmartContract();

        const price = ethers.utils.parseUnits(formInputPrice, "ether");

        const listingPrice = await contract.getListingPrice();

        const transaction = await contract.createToken(url, price, {
          value: listingPrice.toString(),
        });

        let collectionId;
        console.log("data ===========> ", collectionData);

        if (collectionData !== undefined || collectionData !== null) {
          if (collectionData.created === false) {
            const res = await axios.post("/api/v1/collections", {
              ...collectionData,
              creator: currentAccount?.toLowerCase(),
            });

            collectionId = res?.data?.data?._id;
          } else {
            collectionId = collectionData._id;
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
            await axios.post("/api/v1/nfts", data);
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

          console.log(data);

          const res = await axios.patch(
            `http://localhost:5000/api/v1/nfts/${tokenId}`,
            data
          );
          console.log(res);
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

  // fetch nfts

  const fetchNFT = async (id) => {
    const contract = await connectingWithSmartContract();

    const {
      tokenId,
      seller,
      owner,
      price: unformattedPrice,
    } = await contract.fetchSingleNft(id);

    const tokenURI = await contract.tokenURI(tokenId);

    const { data } = await axios.get(tokenURI);

    const { media, name, description, fileType } = data;

    const price = ethers.utils.formatUnits(
      unformattedPrice.toString(),
      "ether"
    );

    return {
      price,
      tokenId: tokenId.toNumber(),
      seller,
      owner,
      media,
      fileType,
      name,
      description,
      tokenURI,
    };
  };

  const fetchNFTs = async () => {
    try {
      const contract = await connectingWithSmartContract();

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data?.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const { data } = await axios.get(tokenURI);

            const { media, name, description, fileType } = data;

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              media,
              fileType,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      setIsError(true);
      setIsError("internal Server Error!");
    }
  };

  // fetch myNfts or listed nfts

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const data =
        type === "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { media, fileType, name, description },
            } = await axios.get(tokenURI);

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              tokenId: tokenId.toNumber(),
              price,
              media,
              fileType,
              description,
              seller,
              owner,
              tokenURI,
              name,
            };
          }
        )
      );

      return items;
    } catch (error) {
      setIsError(true);
      setIsError("internal Server Error!");
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

        const res = await axios.patch(
          `http://localhost:5000/api/v1/nfts/${tokenId}`,
          data
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
          fetchNFT,
          buyNft,
          setError,
          error,
          isError,
          successMsg,
          setSuccessMsg,
          setIsSuccess,
          isSuccess,
          setIsError,
          fetchNFTs,
          fetchMyNFTsOrListedNFTs,
        }}
      >
        {children}
      </NFTMarketplaceContext.Provider>
    </>
  );
};

export default NFTMarketplaceProvider;
