import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Shop from "./Pages/shop/Shop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FooterContainer from "./components/footerContainer/FooterContainer";
import NavSideBar from "./navSidebar/NavSideBar";
import { useState } from "react";
function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Router>
      <div className="App">
        {openSidebar ? (
          <NavSideBar />
        ) : (
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        )}

        <Routes>
          <Route path="/shop" element={<Shop />}></Route>
        </Routes>
        <FooterContainer />
      </div>
    </Router>
  );
}

export default App;
