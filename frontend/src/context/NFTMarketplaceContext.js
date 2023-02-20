import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

import Web3Modal from "web3modal";

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./contanst";

export const NFTMarketplaceContext = createContext();

const NFTMarketplaceProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

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
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      return contract;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while connecting to smart contract");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        console.log("install metamask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }

      console.log(currentAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log("insatall metamask");
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNFT = async (
    name,
    price,
    media,
    fileType,
    description,
    router
  ) => {
    try {
      if (!name || !description || !media || !fileType || !price) {
        console.log("Data is missing");
      }

      const data = { name, description, media, fileType };

      const response = await axios.post(
        "http://localhost:5000/api/v1/nfts/uploadNFT",
        data
      );

      const url = response.data.url;
      // console.log(url);

      await createSale(url, price, name);
    } catch (error) {
      console.log("creating nft error: ", error);
    }
  };

  const createSale = async (url, formInputPrice, name, isReselling, id) => {
    try {
      const contract = await connectingWithSmartContract();

      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const listingPrice = await contract.getListingPrice();

      if (!isReselling) {
        const transaction = await contract.createToken(url, price, {
          value: listingPrice.toString(),
        });

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
            };

            await axios.post("http://localhost:5000/api/v1/nfts", data);
            // console.log(postData);
          }
        );

        await transaction.wait();
      } else {
        const transaction = await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });

        contract.on("resellEvent", async (tokenId, seller, owner, price) => {
          const data = {
            tokenId: Number(String(tokenId)),
            seller,
            owner,
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
      }
    } catch (error) {
      console.log("creating sale error: ", error);
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
      console.log(error);
      console.log("Erroe while fetching nfts");
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
      console.log("error while fetching listed nfts ", error);
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

      contract.on("buyEvent", async (tokenId, seller, owner, price) => {
        const data = {
          tokenId: Number(String(tokenId)),
          seller,
          owner,
          sold: true,
        };
        console.log(data);

        const res = await axios.patch(
          `http://localhost:5000/api/v1/nfts/${tokenId}`,
          data
        );

        console.log(res);
      });

      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("error while buying nft ", error);
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