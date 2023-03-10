import React, { useContext } from "react";
import HomeContainerMain from "../../components/home/HomeContainerMain";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import Loader from "../../components/loader/Loader";

const HomePage = () => {
  const { isLoading } = useContext(NFTMarketplaceContext);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <HomeContainerMain />
    </>
  );
};

export default HomePage;
