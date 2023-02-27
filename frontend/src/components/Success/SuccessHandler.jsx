import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";
import "./successHandler.css";

const SuccessHandler = () => {
  const { setIsSuccess, successMsg } = useContext(NFTMarketplaceContext);

  return (
    <div className="successContainer">
      <p>{successMsg}</p>
      <CgClose
        className="closeSuccessIcon"
        onClick={() => setIsSuccess(false)}
      ></CgClose>
    </div>
  );
};

export default SuccessHandler;
