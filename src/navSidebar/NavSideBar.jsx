import "./navSideBar.css";

const NavSideBar = () => {
  return (
    <div className="navSideBarContainer">
      <div className="navResponsiveListItemContainer">
        <ul className="navResponsiveListItemUl">
          <li className="navResponsiveListItem">
            <a href="/">Home</a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/">Shop</a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/">Contact Us</a>
          </li>
          <li className="navResponsiveListItem">
            <a href="/">About Us</a>
          </li>
        </ul>
      </div>
      <hr className="navResponsiveListHr" />
    </div>
  );
};

export default NavSideBar;
