import "./nftBuyAndBidMainContainer.css";
import NftAuthorName from "./nftAuthorName/NftAuthorName";
import NftTokenName from "./nftTokenName/NftTokenName";
import NftRanking from "./nftRanking/NftRanking";
import NftBuyBidAndSaleContainer from "./nftBuyBidAndSaleContainer/NftBuyBidAndSaleContainer";
import NftDetailContainer from "./nftDetails/NftDetailContainer";

<<<<<<< HEAD
const NftBuyAndBidMainContainer = ({ nft, like, likes, setLike, setLikes }) => {
=======
const NftBuyAndBidMainContainer = ({
  nft,
  like,
  likes,
  toggleLikHandler,
  setLikeHandler,
}) => {
  console.log(nft);
>>>>>>> d9b5ef9c6f49b0284ca9a4593e5c69382c430bf4
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
