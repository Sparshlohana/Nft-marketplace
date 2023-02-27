import { useState } from "react";
import { useEffect } from "react";
import NftCard from "../../../nftCardsContainerMain/nftCardContainer/nftCard/NftCard";
import NftAudioCard from "../../../nftCardsContainerMain/nftCardContainer/nftCard/NftAudioCard/NftAudioCard";
import "./priceUnderCards.css";

import { handleFilteredNfts } from "../../../../apiFunctions/nftsApi";

const PriceUnderCards = ({ price }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    handleFilteredNfts(0, price).then((data) => setNfts(data));
  }, []);

  return (
    <>
      <div className="nftCardContainer priceUnderCardsContainer">
        {nfts?.map((nft, i) => {
          return nft?.fileType === "audio" ? (
            <NftAudioCard key={i} nft={nft} />
          ) : (
            <NftCard key={i} nft={nft} />
          );
        })}
      </div>
    </>
  );
};

export default PriceUnderCards;
