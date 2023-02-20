import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import "./nftBuyAndMakeOffer.css";

const NftBuyAndMakeOffer = ({ nft }) => {
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
          <p className="USDPrice">$0.045</p>
        </div>
        <div className="INRPriceContainer">
          <p className="INRPrice">&#x20B9;0.045</p>
        </div>
      </div>
      <div className="buyNowContainerMain">
        <div className="buyNowContainer">
          <button className="addToCartBtn">
            <AiOutlineShoppingCart className="buyNowIcons" />
            <span className="buyNowSpan"> Add to Cart</span>
          </button>
        </div>
        <div className="buyNowContainer">
          <button className="addToCartBtn">
            <FaRegHandshake className="buyNowIcons" />
            <span className="buyNowSpan"> Buy Now</span>
          </button>
        </div>
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
