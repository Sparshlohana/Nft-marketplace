import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorHandler from "./components/Error/ErrorHandler";
import FooterContainer from "./components/footerContainer/FooterContainer";
import Navbar from "./components/navbar/Navbar";
import NavSideBar from "./components/navSidebar/NavSideBar";
import SuccessHandler from "./components/Success/SuccessHandler";
import { NFTMarketplaceContext } from "./context/NFTMarketplaceContext";
import CategoryPage from "./Pages/categoryPage/CategoryPage";
import CollectionPage from "./Pages/collectionPage/CollectionPage";
import CreateNftPage from "./Pages/createNftPage/CreateNftPage";
import HomePage from "./Pages/homePage/HomePage";
import Details from "./Pages/nftDetails/Details";
import ProfilePage from "./Pages/profilePage/ProfilePage";
import ResellNftPage from "./Pages/resellNftPage/ResellNftPage";
import Shop from "./Pages/shop/Shop";
import UserDetailPage from "./Pages/userDetailPage/UserDetailPage";
import axios from "./utils/axios";
import useDebounce from "./utils/debounce";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState([]);
  const [nfts, setNfts] = useState([]);

  const {
    checkIfWalletIsConnected,
    withdrawn,
    currentAccount,
    isSuccess,
    success,
    error,
    isError,
    setCurrentAccount,
  } = useContext(NFTMarketplaceContext);

  const fetchSearchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const collectionRes = await axios.get(
        `/api/v1/collections?search=${search}`,
        { headers: { Authorization: token } }
      );

      const nftsRes = await axios.get(`/api/v1/nfts?search=${search}`, {
        headers: { Authorization: token },
      });

      setNfts(nftsRes.data.data.nfts);
      setCollections(collectionRes.data.collections);
    } catch (error) {}
  };

  useEffect(() => {
    const account = localStorage.getItem("account");
    setCurrentAccount(account);
  });

  useDebounce(
    () => {
      fetchSearchData();
    },
    [search],
    800
  );
  window.scrollTo(0, 0);
  return (
    <div className="App">
      <Navbar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        search={search}
        setSearch={setSearch}
        nfts={nfts}
        collections={collections}
      />
      {openSidebar && <NavSideBar />}
      {isError ? <ErrorHandler msg={error} /> : null}
      {isSuccess ? <SuccessHandler msg={success} /> : null}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route
          path="/shop"
          element={<Shop search={search} setSearch={setSearch} />}
        ></Route>

        <Route path="/nft/:id" element={<Details />}></Route>

        <Route path="/create" element={<CreateNftPage />}></Route>

        <Route
          path="/user"
          element={<UserDetailPage search={search} setSearch={setSearch} />}
        ></Route>

        <Route path="/resell/:id" element={<ResellNftPage />}></Route>

        <Route
          path="/categories/:category"
          element={<CategoryPage search={search} setSearch={setSearch} />}
        ></Route>

        <Route
          path="/collection/:id"
          element={<CollectionPage search={search} setSearch={setSearch} />}
        ></Route>

        <Route path="/user/edit" element={<ProfilePage />}></Route>
      </Routes>
      <FooterContainer />
    </div>
  );
}

export default App;
