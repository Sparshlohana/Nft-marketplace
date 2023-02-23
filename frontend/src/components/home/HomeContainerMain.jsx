import PriceUnderContainer from "./home-priceUnderContainer/PriceUnderContainer";
import HomeCarousel from "./homeCarousel/HomeCarousel";
import HomeCategoriesContainer from "./homeCategoriesContainer/HomeCategoriesContainer";
import "./homeContainerMain.css";

const HomeContainerMain = () => {
  return (
    <div className="homeContainerMain">
      <HomeCarousel />
      <HomeCategoriesContainer />
      <hr className="homeContainerHr" />
      <PriceUnderContainer />
    </div>
  );
};

export default HomeContainerMain;
