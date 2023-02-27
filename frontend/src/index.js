import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import NFTMarketplaceProvider from "./context/NFTMarketplaceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NFTMarketplaceProvider>
        <App />
      </NFTMarketplaceProvider>
    </Router>
  </React.StrictMode>
);
