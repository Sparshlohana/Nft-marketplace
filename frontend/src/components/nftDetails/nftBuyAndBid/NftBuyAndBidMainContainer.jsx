import "./nftBuyAndBidMainContainer.css";
import NftAuthorName from "./nftAuthorName/NftAuthorName";
import NftTokenName from "./nftTokenName/NftTokenName";
import NftRanking from "./nftRanking/NftRanking";
import NftBuyBidAndSaleContainer from "./nftBuyBidAndSaleContainer/NftBuyBidAndSaleContainer";
import NftDetailContainer from "./nftDetails/NftDetailContainer";

const NftBuyAndBidMainContainer = ({ nft, like, likes, setLike, setLikes }) => {
  console.log(nft);
  return (
    <div className="NftBuyAndBidMainContainer">
      <NftAuthorName nft={nft} />
      <NftTokenName nft={nft} />
      <NftRanking
        nft={nft}
        like={like}
        likes={likes}
        setLike={setLike}
        setLikes={setLikes}
      ></NftRanking>
      <NftBuyBidAndSaleContainer nft={nft} />
      <NftDetailContainer nft={nft} />
    </div>
  );
};

export default NftBuyAndBidMainContainer;
