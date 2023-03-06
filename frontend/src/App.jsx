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
import axios from "./utils/axios";
import ErrorHandler from "./components/Error/ErrorHandler";
import SuccessHandler from "./components/Success/SuccessHandler";
import CategoryPage from "./Pages/categoryPage/CategoryPage";
import CollectionPage from "./Pages/collectionPage/CollectionPage";
import HomePage from "./Pages/homePage/HomePage";
import ResellNftPage from "./Pages/resellNftPage/ResellNftPage";
import UserDetailPage from "./Pages/userDetailPage/UserDetailPage";
import SearchItemsContainer from "./components/searchItemsContainer/SearchItemsContainer";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState([]);
  const [nfts, setNfts] = useState([]);

  const [show, setShow] = useState(true);

  const {
    checkIfWalletIsConnected,
    currentAccount,
    isSuccess,
    success,
    error,
    isError,
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
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  useEffect(() => {
    (async () => {
      await checkIfWalletIsConnected();
    })();
  });

  useEffect(() => {
    setTimeout(async () => {
      fetchSearchData();
    }, 2000);
  }, [search]);

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
      {isError && show ? <ErrorHandler msg={error} /> : null}
      {isSuccess && show ? <SuccessHandler msg={success} /> : null}
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
      </Routes>
      <FooterContainer />
    </div>
  );
}

export default App;
