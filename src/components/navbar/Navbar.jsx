import "./Navbar.css";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { LiaBarsSolid } from "react-icons/lia";
import { FaBell } from "react-icons/fa";
import { PiBarcodeBold } from "react-icons/pi";
import SearchBar from "./Search";
import logo from "../../assets/logo.png";
import QRScanner from "../barCodeReader/BarCodeReader";
function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openQrScanner, setOpenQrScanner] = useState(false);

  function openSidebarFunc() {
    setOpenSidebar(true);
  }
  function closeSidebarFunc() {
    setOpenSidebar(false);
  }
  openSidebar
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <header className="Navbar">
      <div className="container">
        {openSidebar && <Sidebar closeSidebarFunc={closeSidebarFunc} />}
        {openQrScanner && <QRScanner setOpenQrScanner={setOpenQrScanner} />}
        <div className="navbar">
          {/* NAVBAR MAIN */}
          <div className="navbar__main">
            <Link to={"/"} className="navbar__logo">
              <img src={logo} alt="logo" />
            </Link>
            {/* SEARCH BAR */}
            <SearchBar />
            <div className="nav__btns__sm nav__btns">
              <PiBarcodeBold
                className="scanner"
                title="Shtrix kodni skanerlang"
                onClick={() => setOpenQrScanner(!openQrScanner)}
              />
              <FaBell className="bell" title="Bildirishnomalar" />
              <LiaBarsSolid onClick={openSidebarFunc} className="bar__icon" />
            </div>
          </div>
          {/*  NAVBAR LINKS */}
          <div className="nav__links">
            <NavLink to={"/"}>Daromad</NavLink>
            <NavLink to={"/product"}>Mahsulot</NavLink>
            <NavLink to={"/nasiya"}>Nasiya</NavLink>
            <NavLink to={"/cart"}>Table</NavLink>
            <div className="nav__btns">
              <PiBarcodeBold
                title="Shtrix kodni skanerlang"
                onClick={() => setOpenQrScanner(!openQrScanner)}
              />
              <FaBell className="bell" title="Bildirishnomalar" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
