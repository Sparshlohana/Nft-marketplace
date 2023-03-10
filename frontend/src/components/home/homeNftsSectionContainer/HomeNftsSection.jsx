import { useState } from "react";
import { useEffect } from "react";
import NftCard from "../../nftCardsContainerMain/nftCardContainer/nftCard/NftCard";
import NftAudioCard from "../../nftCardsContainerMain/nftCardContainer/nftCard/NftAudioCard/NftAudioCard";

import { useContext } from "react";
import axios from "../../../utils/axios";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const HomeNftsSection = ({ url }) => {
  const [nfts, setNfts] = useState([]);

  const { random, setIsLoading } = useContext(NFTMarketplaceContext);

  const fetchNfts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(url);
      if (res.data?.data) {
        setNfts(res.data?.data?.nfts);
      } else {
        const data = res.data?.nfts;
        setNfts(data);
      }

      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await fetchNfts();
    })();
  }, [random]);

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

export default HomeNftsSection;
