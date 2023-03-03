import "./nftBuyAndBidMainContainer.css";
import NftAuthorName from "./nftAuthorName/NftAuthorName";
import NftTokenName from "./nftTokenName/NftTokenName";
import NftRanking from "./nftRanking/NftRanking";
import NftBuyBidAndSaleContainer from "./nftBuyBidAndSaleContainer/NftBuyBidAndSaleContainer";
import NftDetailContainer from "./nftDetails/NftDetailContainer";

const NftBuyAndBidMainContainer = ({
  nft,
  like,
  likes,
  toggleLikHandler,
  setLikeHandler,
}) => {
  return (
    <div className="NftBuyAndBidMainContainer">
      <NftAuthorName nft={nft} />
      <NftTokenName nft={nft} />
      <NftRanking
        nft={nft}
        like={like}
        likes={likes}
        toggleLikHandler={toggleLikHandler}
        setLikeHandler={setLikeHandler}
      ></NftRanking>
      <NftBuyBidAndSaleContainer nft={nft} />
      <NftDetailContainer nft={nft} />
    </div>
  );
};

export default NftBuyAndBidMainContainer;
