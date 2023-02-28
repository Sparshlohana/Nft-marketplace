import { useState } from "react";
import { useEffect } from "react";
import NftCard from "../../../nftCardsContainerMain/nftCardContainer/nftCard/NftCard";
import NftAudioCard from "../../../nftCardsContainerMain/nftCardContainer/nftCard/NftAudioCard/NftAudioCard";
import "./priceUnderCards.css";

import { handleFilteredNfts } from "../../../../apiFunctions/nftsApi";

const PriceUnderCards = ({ minPrice, maxPrice }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    handleFilteredNfts(minPrice, maxPrice).then((data) => setNfts(data));
  }, []);

  console.log(nfts);

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
