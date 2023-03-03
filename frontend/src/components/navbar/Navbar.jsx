import "./navbar.css";
import { RiCloseLine, RiEqualizerLine } from "react-icons/ri";
import lucentLogo from "./lucentLogo.png";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ openSidebar, setOpenSidebar, search, setSearch }) => {
  const { connectWallet, currentAccount } = useContext(NFTMarketplaceContext);

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
        <img src={lucentLogo} alt="logo" className="logo"></img>
      </div>

      <div className="searchContainer">
        <input
          type="search"
          name="search"
          id="search"
          className="searchBar"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/3917/3917754.png"
          alt=""
          className="searchIcon"
        />
      </div>
      <ul className="navUl">
        <Link to="/" className="navItemsLink">
          <li className="navItems">Home</li>
        </Link>
        <Link to="/shop" className="navItemsLink">
          <li className="navItems">Shop</li>
        </Link>
        {/* <Link to={"/user"} className="navItemsLink">
          <li className="navItems">Profile</li>
        </Link> */}
        <Link className="navItemsLink">
          <li className="navItems">About Us</li>
        </Link>
      </ul>
      <div className="signInContainer">
        {currentAccount !== "" ? (
          <Link to={"/create"}>
            <button className="signIn">Create</button>
          </Link>
        ) : (
          <button className="signInBtn" onClick={connectWallet}>
            Sign In
          </button>
        )}
        <Link to={"/user"} className="navItemsLink">
          <CgProfile className="navProfileIcon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
