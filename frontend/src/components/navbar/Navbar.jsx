import "./navbar.css";
import { RiCloseLine, RiEqualizerLine } from "react-icons/ri";
import lucentLogo from "./lucentLogo.png";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";
import SearchItemsContainer from "../searchItemsContainer/SearchItemsContainer";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

const Navbar = ({
  openSidebar,
  setOpenSidebar,
  search,
  setSearch,
  collections,
  nfts,
}) => {
  const { connectWallet, currentAccount, setCurrentAccount } = useContext(
    NFTMarketplaceContext
  );

  const [openCollectionItems, setOpenCollectionItems] = useState(false);

  return (
    <nav className="navContainer">
      <div className="navResponsiveBtnContainer">
        {openSidebar ? (
          <RiCloseLine
            className="navResponsiveBtn"
            onClick={() => setOpenSidebar(false)}
          ></RiCloseLine>
        ) : (
          <RiEqualizerLine
            onClick={() => setOpenSidebar(!openSidebar)}
            className="navResponsiveBtn"
          />
        )}
      </div>
      <div className="logoContainer">
        {/* <p className="logo">LOGO</p> */}

        <Link to="/">
          <img src={lucentLogo} alt="logo" className="logo"></img>
        </Link>
      </div>

      <div className="searchContainerMain">
        <Searchbar
          title={"Search Here.."}
          search={search}
          openCollectionItems={openCollectionItems}
          setOpenCollectionItems={setOpenCollectionItems}
          setSearch={setSearch}
        ></Searchbar>
        {search !== "" && (
          <SearchItemsContainer collections={collections} nfts={nfts} />
        )}
      </div>
      <ul className="navUl">
        <Link to="/" className="navItemsLink">
          <li className="navItems">Home</li>
        </Link>
        <Link to="/shop" className="navItemsLink">
          <li className="navItems">Shop</li>
        </Link>
        <Link to="/categories/photography" className="navItemsLink">
          <li className="navItems">Explore</li>
        </Link>
      </ul>
      <div className="signInContainer">
        {currentAccount !== "" ? (
          <>
            <Link to={"/create"}>
              <button className="signIn">Create</button>
            </Link>
          </>
        ) : (
          <button className="signInBtn" onClick={connectWallet}>
            Sign In
          </button>
        )}
        {currentAccount !== "" && (
          <>
            <div className="userLogoutBtn">
              <Link to={"/user"} className="navItemsLink">
                <CgProfile className="navProfileIcon" />
              </Link>
              <div
                className="logoutBtn"
                onClick={() => {
                  localStorage.setItem("account", "");
                  window.location.reload();
                }}
              >
                <BiLogOut></BiLogOut>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
