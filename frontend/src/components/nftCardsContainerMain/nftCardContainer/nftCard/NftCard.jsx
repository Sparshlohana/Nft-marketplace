import "./nftCard.css";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NftCard = ({ nft, filter }) => {
  const [price, setPrice] = useState("");

  const fetchCurrentPriceOfEth = async () => {
    try {
      if (filter.currency === "INR") {
        const inrPrice = await axios.get(
          "https://api.coinconvert.net/convert/eth/inr?amount=" + nft?.price
        );
        setPrice("₹ " + Math.floor(inrPrice.data.INR) + " INR ");
      } else if (filter.currency === "USD") {
        const usdPrice = await axios.get(
          "https://api.coinconvert.net/convert/eth/usd?amount=" + nft?.price
        );

        setPrice("$ " + usdPrice.data.USD + " USD ");
      } else {
        setPrice(nft?.price + " ETH ");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            {nft.seller.slice(0, 7) + "..." + nft.seller.slice(37)}
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
          <div className="nftCardBuyContainer">
            <button className="nftCardBuyBtn">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
