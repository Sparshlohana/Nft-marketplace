import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Shop from "./Pages/shop/Shop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FooterContainer from "./components/footerContainer/FooterContainer";
import NavSideBar from "./components/navSidebar/NavSideBar";
import { useContext, useEffect, useState } from "react";
import Details from "./Pages/nftDetails/Details";
import CreateNftPage from "./Pages/createNftPage/CreateNftPage";
import { NFTMarketplaceContext } from "./context/NFTMarketplaceContext";

import UserDetailPage from "./Pages/userDetailPage/UserDetailPage";
import ResellNftPage from "./Pages/resellNftPage/ResellNftPage";
import HomePage from "./Pages/homePage/HomePage";
import ErrorHandler from "./components/Error/ErrorHandler";
import SuccessHandler from "./components/Success/SuccessHandler";
import CategoryPage from "./Pages/categoryPage/CategoryPage";
import CollectionPage from "./Pages/collectionPage/CollectionPage";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const {
    checkIfWalletIsConnected,
    currentAccount,
    isSuccess,
    success,
    error,
    isError,
  } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    (async () => await checkIfWalletIsConnected())();
  });

  return (
    <div className="App">
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      {openSidebar && <NavSideBar />}
      {isError && <ErrorHandler msg={error} />}
      {isSuccess && <SuccessHandler msg={success} />}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Routes>
        <Route path="/shop" element={<Shop />}></Route>
      </Routes>
      <Routes>
        <Route path="/nft/:id" element={<Details />}></Route>
      </Routes>
      <Routes>
        <Route path="/create" element={<CreateNftPage />}></Route>
      </Routes>
      <Routes>
        <Route path="/user" element={<UserDetailPage />}></Route>
      </Routes>
      <Routes>
        <Route path="/resell/:id" element={<ResellNftPage />}></Route>
      </Routes>
      <Routes>
        <Route path="/categories/:category" element={<CategoryPage />}></Route>
      </Routes>
      <Routes>
        <Route path="/collection" element={<CollectionPage />}></Route>
      </Routes>
      <FooterContainer />
    </div>
  );
}

export default App;
