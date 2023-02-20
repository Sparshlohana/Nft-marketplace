import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Shop from "./Pages/shop/Shop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FooterContainer from "./components/footerContainer/FooterContainer";
import NavSideBar from "./components/navSidebar/NavSideBar";
import { useState } from "react";
import Details from "./Pages/nftDetails/Details";
import CreateNftPage from "./Pages/createNftPage/CreateNftPage";
import UserDetailPage from "./Pages/userDetailPage/UserDetailPage";
function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        {openSidebar && <NavSideBar />}
        <Routes>
          <Route path="/shop" element={<Shop />}></Route>
        </Routes>
        <Routes>
          <Route path="/detail" element={<Details />}></Route>
        </Routes>
        <Routes>
          <Route path="/nft/create" element={<CreateNftPage />}></Route>
        </Routes>
        <Routes>
          <Route path="/user" element={<UserDetailPage />}></Route>
        </Routes>
        <FooterContainer />
      </div>
    </Router>
  );
}

export default App;
