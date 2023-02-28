import PriceUnderHeading from "./priceUnderHeading/PriceUnderHeading";
import "./priceUnderContainer.css";
import PriceUnderCards from "./priceUnderCards/PriceUnderCards";

const PriceUnderContainer = () => {
  return (
    <div className="priceUnderContainerMain">
      <PriceUnderHeading title={"Nfts under 5 ETH"} />
      <PriceUnderCards minPrice={0} maxPrice={5} />
      <hr className="priceUnderContainerHr" />
      <PriceUnderHeading title={"Nfts Between 5ETH and 15 ETH"} />
      <PriceUnderCards minPrice={5} maxPrice={15} />
      <hr className="priceUnderContainerHr" />
      <PriceUnderHeading title={"Nfts Between 15ETH and 25 ETH"} />
      <PriceUnderCards minPrice={15} maxPrice={25} />
    </div>
  );
};

export default PriceUnderContainer;
