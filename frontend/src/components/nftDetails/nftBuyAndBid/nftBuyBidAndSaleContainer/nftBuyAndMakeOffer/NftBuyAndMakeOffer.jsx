import { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import "./nftBuyAndMakeOffer.css";
import axios from "axios";
import { NFTMarketplaceContext } from "../../../../../context/NFTMarketplaceContext";
import { Link } from "react-router-dom";

const NftBuyAndMakeOffer = ({ nft }) => {
  const [usd, setUsd] = useState(0);
  const [inr, setInr] = useState(0);

  const { buyNft, currentAccount } = useContext(NFTMarketplaceContext);

  const fetchCurrentPriceOfEth = async () => {
    try {
      const inrPrice = await axios.get(
        "https://api.coinconvert.net/convert/eth/inr?amount=" + nft?.price
      );
      setInr(Math.floor(inrPrice.data.INR));

      const usdPrice = await axios.get(
        "https://api.coinconvert.net/convert/eth/usd?amount=" + nft?.price
      );

      setUsd(usdPrice.data.USD);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentPriceOfEth();
  }, []);

  return (
    <div className="nftBuyAndMakeOfferContainer">
      <div className="currentPriceContainer">
        <p className="currentPrice">Current price</p>
      </div>
      <div className="nftPriceContainer">
        <div className="ethereumPriceContainer">
          <p className="ethereumPrice">{nft?.price} ETH</p>
        </div>
        <div className="USDPriceContainer">
          <p className="USDPrice">${usd}</p>
        </div>
        <div className="INRPriceContainer">
          <p className="INRPrice">&#x20B9;{inr} INR</p>
        </div>
      </div>
      <div className="buyNowContainerMain">
        <div className="buyNowContainer">
          <button className="addToCartBtn">
            <AiOutlineShoppingCart className="buyNowIcons" />
            <span className="buyNowSpan"> Add to Cart</span>
          </button>
        </div>
        {currentAccount === nft?.owner && <h1>YOU OWNED THIS NFT</h1>}
        {currentAccount === nft?.owner ? (
          <div className="buyNowContainer">
            <Link to={"/nft/resell/" + nft.tokenId}>
              <button className="addToCartBtn">
                <FaRegHandshake className="buyNowIcons" />
                <span className="buyNowSpan"> Resell NFT</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="buyNowContainer">
            <button
              className="addToCartBtn"
              onClick={() => {
                buyNft(nft);
              }}
            >
              <FaRegHandshake className="buyNowIcons" />
              <span className="buyNowSpan"> Buy Now</span>
            </button>
          </div>
        )}
        <div className="buyNowContainer">
          <button className="addToCartBtn">
            <MdOutlineLocalOffer className="buyNowIcons" />
            <span className="buyNowSpan"> Make Offer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NftBuyAndMakeOffer;
