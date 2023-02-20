import "./nftCard.css";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import NftAudioCard from "./NftAudioCard/NftAudioCard";

const NftCard = ({ nft }) => {
  return (
    <div className="nftCard">
      <Link style={{ textDecoration: "none" }} to={`/nft/${nft.tokenId}`}>
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
            {nft.seller.slice(0, 7) + "..." + nft.seller.slice(28)}
          </p>
          <TiTick className="nftAuthorVerificationImg" />
        </div>
        <div className="nftCardNameContainer">
          <h3 className="nftCardName">{nft.name}</h3>
        </div>

        <div className="nftCardPriceAndBuyContainer">
          <div className="nftCardPriceContainer">
            <p className="nftCardPrice">{nft.price} ETH</p>
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
