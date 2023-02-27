import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import "./errorHandler.css";

const ErrorHandler = ({ msg }) => {
  const { setIsError } = useContext(NFTMarketplaceContext);
  return (
    <div className="errorContainer">
      <p className="errorMessage">{msg}</p>
      <CgClose
        className="closeErrorIcon"
        onClick={() => setIsError(false)}
      ></CgClose>
    </div>
  );
};

export default ErrorHandler;
