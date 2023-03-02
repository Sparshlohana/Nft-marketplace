import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FooterContainer from "./components/footerContainer/FooterContainer";
import Navbar from "./components/navbar/Navbar";
import NavSideBar from "./components/navSidebar/NavSideBar";
import { NFTMarketplaceContext } from "./context/NFTMarketplaceContext";
import CreateNftPage from "./Pages/createNftPage/CreateNftPage";
import Details from "./Pages/nftDetails/Details";
import Shop from "./Pages/shop/Shop";

import ErrorHandler from "./components/Error/ErrorHandler";
import SuccessHandler from "./components/Success/SuccessHandler";
import CategoryPage from "./Pages/categoryPage/CategoryPage";
import CollectionPage from "./Pages/collectionPage/CollectionPage";
import HomePage from "./Pages/homePage/HomePage";
import ResellNftPage from "./Pages/resellNftPage/ResellNftPage";
import UserDetailPage from "./Pages/userDetailPage/UserDetailPage";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [search, setSearch] = useState(null);
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
      <Navbar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        search={search}
        setSearch={setSearch}
      />
      {openSidebar && <NavSideBar />}
      {isError && <ErrorHandler msg={error} />}
      {isSuccess && <SuccessHandler msg={success} />}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Routes>
        <Route
          path="/shop"
          element={<Shop search={search} setSearch={setSearch} />}
        ></Route>
      </Routes>
      <Routes>
        <Route path="/nft/:id" element={<Details />}></Route>
      </Routes>
      <Routes>
        <Route path="/create" element={<CreateNftPage />}></Route>
      </Routes>
      <Routes>
        <Route
          path="/user"
          element={<UserDetailPage search={search} setSearch={setSearch} />}
        ></Route>
      </Routes>
      <Routes>
        <Route path="/resell/:id" element={<ResellNftPage />}></Route>
      </Routes>
      <Routes>
        <Route
          path="/categories/:category"
          element={<CategoryPage search={search} setSearch={setSearch} />}
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/collection/:id"
          element={<CollectionPage search={search} setSearch={setSearch} />}
        ></Route>
      </Routes>
      <FooterContainer />
    </div>
  );
}

export default App;
