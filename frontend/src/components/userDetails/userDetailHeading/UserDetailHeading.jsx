import { useContext } from "react";
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import "./userDetailHeading.css";

const UserDetailHeading = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);
  return (
    <div className="userDetailHeadingContainer">
      <h3 className="userDetailHeading">
        {currentAccount.slice(0, 13) + "...." + currentAccount.slice(24)}
      </h3>
    </div>
  );
};

export default UserDetailHeading;
