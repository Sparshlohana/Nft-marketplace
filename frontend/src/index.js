import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NFTMarketplaceProvider from "./context/NFTMarketplaceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NFTMarketplaceProvider>
      <App />
    </NFTMarketplaceProvider>
  </React.StrictMode>
);
