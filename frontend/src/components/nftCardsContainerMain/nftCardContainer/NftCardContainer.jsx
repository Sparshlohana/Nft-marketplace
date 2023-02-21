import NftAudioCard from "./nftCard/NftAudioCard/NftAudioCard";
import NftCard from "./nftCard/NftCard";
import "./nftCardContainer.css";

<<<<<<< HEAD
const NftCardContainer = ({ nfts, filter }) => {
=======
const NftCardContainer = ({ openFilter, nfts, filter }) => {
>>>>>>> 8156a3078ce351b6d42a3c674e43b5011021e326
  return (
    <div className="nftCardContainer">
      {nfts?.map((nft, i) => {
        return nft?.fileType === "audio" ? (
          <NftAudioCard key={i} filter={filter} nft={nft} />
        ) : (
          <NftCard filter={filter} key={i} nft={nft} />
        );
      })}
    </div>
  );
};

export default NftCardContainer;
