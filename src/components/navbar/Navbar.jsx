import "./navbar.css";
import { RiEqualizerLine } from "react-icons/ri";

const Navbar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <nav className="navContainer">
      <div className="navResponsiveBtnContainer">
        <RiEqualizerLine
          onClick={() => setOpenSidebar(!openSidebar)}
          className="navResponsiveBtn"
        />
      </div>
      <div className="logoContainer">
        {/* <img src="" alt="logo" /> */}
        <p className="logo">LOGO</p>
      </div>

      <div className="searchContainer">
        <input
          type="search"
          name="search"
          id="search"
          className="searchBar"
          placeholder="Search Here..."
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/3917/3917754.png"
          alt=""
          className="searchIcon"
        />
      </div>
      <ul className="navUl">
        <li className="navItems">Home</li>
        <li className="navItems">Shop</li>
        <li className="navItems">Contact Us</li>
        <li className="navItems">About Us</li>
      </ul>
      <div className="signInContainer">
        <button className="signIn">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
