import PriceUnderHeading from "./priceUnderHeading/PriceUnderHeading";
import "./priceUnderContainer.css";
import PriceUnderCards from "./priceUnderCards/PriceUnderCards";
import HomeNftsSection from "../homeNftsSectionContainer/HomeNftsSection";

const PriceUnderContainer = () => {
  return (
    <div className="priceUnderContainerMain">
      <PriceUnderHeading title={"Top 15 Popular Nfts"} />
      <HomeNftsSection url={"/api/v1/nfts/popular-nfts?likes=1"} />

      <PriceUnderHeading title={"Latest Trending Nfts"} />
      <HomeNftsSection url={"/api/v1/nfts/trending-nfts"} />

      <PriceUnderHeading title={"Nfts under 5 ETH"} />
      <PriceUnderCards minPrice={0} maxPrice={5} />
    </div>
  );
};

export default PriceUnderContainer;
