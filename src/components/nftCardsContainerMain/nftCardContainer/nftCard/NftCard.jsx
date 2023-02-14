import "./nftCard.css";
import { TiTick } from "react-icons/ti";

const NftCard = () => {
  const op = (e) => {
    console.log(e);
  };
  return (
    <div className="nftCard">
      <div className="nftCardImgContainer" onClick={(e) => op(e)}>
        <img
          src="https://static01.nyt.com/images/2021/03/12/arts/11nft-auction-cryptopunks-print/11nft-auction-cryptopunks-print-mobileMasterAt3x.jpg"
          alt=""
          className="nftCardImg"
        />
      </div>
      <div className="nftCardContent">
        <div className="nftCardAuthorNameContainer">
          <p className="nftCardAuthorName">Deep Prajapati</p>
          <TiTick className="nftAuthorVerificationImg" />
        </div>
        <div className="nftCardNameContainer">
          <h3 className="nftCardName">#Card_Name</h3>
        </div>
        <div className="nftCardPriceAndBuyContainer">
          <div className="nftCardPriceContainer">
            <p className="nftCardPrice">100 ETH</p>
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
