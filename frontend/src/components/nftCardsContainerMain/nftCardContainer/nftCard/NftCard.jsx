import "./nftCard.css";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../../utils/axios";
import { NFTMarketplaceContext } from "../../../../context/NFTMarketplaceContext";
import { NFTMarketplaceAddress } from "../../../../context/contanst";
import { FaRegHandshake } from "react-icons/fa";

const NftCard = ({ nft, filter }) => {
  const [price, setPrice] = useState(nft?.price + " ETH ");

  const { buyNft, currentAccount } = useContext(NFTMarketplaceContext);
  const token = localStorage.getItem("token");

  const [isPublised, setIsPublished] = useState(nft.isPublised);

  const fetchCurrentPriceOfEth = async () => {
    try {
      if (filter?.currency === "INR") {
        const inrPrice = await axios.get(
          "https://api.coinconvert.net/convert/eth/inr?amount=" + nft?.price
        );
        setPrice("₹ " + Math.floor(inrPrice?.data?.INR) + " INR ");
      } else if (filter?.currency === "USD") {
        const usdPrice = await axios.get(
          "https://api.coinconvert.net/convert/eth/usd?amount=" + nft?.price
        );

        setPrice("$ " + usdPrice?.data?.USD + " USD ");
      } else {
        setPrice(nft?.price + " ETH ");
      }
    } catch (error) {}
  };

  const handlePublish = async () => {
    try {
      if (isPublised) {
        await axiosInstance.post(
          `/api/v1/nfts/pusblishOrUnpublish/${nft?._id}?publish=false`,
          {},
          { headers: { Authorization: token } }
        );
        setIsPublished(false);
      } else {
        await axiosInstance.post(
          `/api/v1/nfts/pusblishOrUnpublish/${nft?._id}?publish=true`,
          {},
          { headers: { Authorization: token } }
        );
        setIsPublished(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    setIsPublished(nft.isPublished);
  }, []);

  useEffect(() => {
    fetchCurrentPriceOfEth();
  });

  return (
    <div className="nftCard">
      <Link style={{ textDecoration: "none" }} to={`/nft/${nft._id}`}>
        <div className="nftCardImgContainer">
          {nft.fileType === "image" && (
            <img src={nft.media} alt="" className="nftCardImg" />
          )}
          {nft.fileType === "video" && (
            <video
              src={nft.media}
              autoPlay
              muted
              className="nftCardImg nftVideoCard"
            />
          )}
        </div>
      </Link>
      <div className="nftCardContent">
        <div className="nftCardAuthorNameContainer">
          <p className="nftCardAuthorName">
            {nft?.seller?.slice(0, 7) + "..." + nft?.seller?.slice(37)}
          </p>
          <TiTick className="nftAuthorVerificationImg" />
        </div>
        <div className="nftCardNameContainer">
          <h3 className="nftCardName">{nft.name}</h3>
        </div>

        <div className="nftCardPriceAndBuyContainer">
          <div className="nftCardPriceContainer">
            <p className="nftCardPrice">{price}</p>
          </div>
          {NFTMarketplaceAddress.toLowerCase() === nft?.owner &&
            currentAccount?.toLowerCase() === nft?.seller && (
              <div className="nftCardBuyContainer">
                {!isPublised ? (
                  <button className="nftCardBuyBtn" onClick={handlePublish}>
                    Publish
                  </button>
                ) : (
                  <button className="nftCardBuyBtn" onClick={handlePublish}>
                    Unpublish
                  </button>
                )}
              </div>
            )}

          {currentAccount?.toLowerCase() === nft?.owner ||
          (NFTMarketplaceAddress.toLowerCase() !== nft?.owner &&
            currentAccount?.toLowerCase() === nft?.seller) ? (
            <div className="buyNowContainer">
              <Link
                style={{ textDecoration: "none" }}
                to={"/resell/" + nft?._id}
              >
                <button className="nftCardBuyBtn">
                  <span className="buyNowSpan"> Resell</span>
                </button>
              </Link>
            </div>
          ) : (
            currentAccount?.toLowerCase() === nft?.seller ||
            (currentAccount && (
              <>
                <div className="buyNowContainer">
                  <button
                    className="nftCardBuyBtn"
                    onClick={() => {
                      buyNft(nft);
                    }}
                  >
                    <span className="buyNowSpan">Buy</span>
                  </button>
                </div>
              </>
            ))
          )}

          {/* <div className="nftCardBuyContainer">
            <button className="nftCardBuyBtn">Buy</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
