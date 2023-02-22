import { useContext } from "react";
import { NFTMarketplaceContext } from "../../../../context/NFTMarketplaceContext";
import "./nftAuthorName.css";

const NftAuthorName = ({ nft }) => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  return (
    <div className="nftAuthorNameContainer">
      <div className="nftAuthorName">
        <a href="/" className="nftAuthorNameAnchor">
          {/* Author Name {} */}
          {currentAccount?.toLowerCase() === nft?.owner
            ? nft?.owner
            : nft?.seller}
        </a>
        <img
          className="nftAuthorNameVerificationImage"
          src="	https://cdn.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default NftAuthorName;
