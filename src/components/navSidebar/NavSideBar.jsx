import "./navSideBar.css";

const NavSideBar = () => {
  return (
    <div className="navSideBarContainer">
      <div className="navResponsiveListItemContainer">
        <ul className="navResponsiveListItemUl">
          <li className="navResponsiveListItem">
            <a href="/" className="navResponsiveListItemAnchor">
              Home
            </a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/" className="navResponsiveListItemAnchor">
              Shop
            </a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/" className="navResponsiveListItemAnchor">
              Contact Us
            </a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/" className="navResponsiveListItemAnchor">
              About Us
            </a>
          </li>
        </ul>
      </div>
      <hr className="navResponsiveListHr" />
      <div className="responsiveSignInContainer">
        <button className="responsiveSignIn">Sign In</button>
        <button className="responsiveSignIn">Sign Up</button>
      </div>
      <hr className="navResponsiveListHr" />
      <div className="navResponsiveListItemContainer">
        <ul className="navResponsiveListItemUl">
          <li className="navResponsiveListItem">
            <a href="/" className="navResponsiveListItemAnchor">
              Help
            </a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/" className="navResponsiveListItemAnchor">
              Term of Service
            </a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/" className="navResponsiveListItemAnchor">
              Feedback
            </a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/" className="navResponsiveListItemAnchor">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavSideBar;
