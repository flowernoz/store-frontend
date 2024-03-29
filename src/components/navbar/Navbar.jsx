import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { LiaBarsSolid } from "react-icons/lia";
import { FaBell, FaRegCalendarAlt } from "react-icons/fa";
import { PiBarcodeBold } from "react-icons/pi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import SearchBar from "./Search";
import logo from "../../assets/logo.png";
import BarCodeReader from "../barCodeReader/BarCodeReader";
import { BiGridAlt } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useFinishedCreditQuery } from "../../redux/criditApi";
function Navbar() {
  const { data } = useFinishedCreditQuery();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openQrScanner, setOpenQrScanner] = useState(false);
  let [dataItem, setDataItem] = useState([]);
  let navigate = useNavigate();
  function openSidebarFunc() {
    setOpenSidebar(true);
  }
  function closeSidebarFunc() {
    setOpenSidebar(false);
  }

  useEffect(() => {
    setDataItem(data?.innerData.filter(item => item.creditTotalPrice > 0) || []); // 1. '?.' operatori qo'shildi va yuqoridagi ifoda uchun yozilgan qo'shish
  }, [data]);

  openSidebar || openQrScanner
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <header className="Navbar">
      <div className="container">
        {openSidebar && <Sidebar closeSidebarFunc={closeSidebarFunc} />}
        {openQrScanner && <BarCodeReader setOpenQrScanner={setOpenQrScanner} />}
        <div className="navbar">
          {/* NAVBAR MAIN */}
          <div className="navbar__main">
            <Link to={"/"} className="navbar__logo">
              <img src={logo} alt="logo" />
            </Link>
            {/* SEARCH BAR */}
            {/* <SearchBar /> */}
            <div className="nav__btns__sm nav__btns">
              <PiBarcodeBold
                className="scanner"
                title="Shtrix kodni skanerlang"
                onClick={() => setOpenQrScanner(!openQrScanner)}
              />
              <div className="bell_container">
                <FaBell
                  onClick={() => navigate("/finishedCredits")}
                  className="bell"
                  title="Bildirishnomalar"
                />
                {dataItem?.length ? (
                  <span className="data_length">{dataItem?.length}</span>
                ) : (
                  ""
                )}
              </div>
              <LiaBarsSolid onClick={openSidebarFunc} className="bar__icon" />
            </div>
          </div>
          {/*  NAVBAR LINKS */}
          <div className="nav__links">
            <div className="nav__btns">
              <PiBarcodeBold
                title="Shtrix kodni skanerlang"
                onClick={() => setOpenQrScanner(!openQrScanner)}
              />
              <div className="bell_container">
                <FaBell
                  onClick={() => navigate("/finishedCredits")}
                  className="bell"
                  title="Bildirishnomalar"
                />
                {dataItem?.length ? (
                  <span className="data_length">{dataItem?.length}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SUB HEADER */}
      <div className="header__sub">
        <NavLink to={"/"}>
          <IoHomeOutline />
          Home
        </NavLink>
        <NavLink to={"/product"}>
          <BiGridAlt />
          Mahsulot
        </NavLink>
        <NavLink to={"/createProduct"}>
          <HiOutlineViewGridAdd />
          yaratish
        </NavLink>
        <NavLink to={"/nasiya"}>
          <FaRegCalendarAlt />
          Nasiya
        </NavLink>
        <NavLink to={"/cart"}>
          <AiOutlineShoppingCart />
          Savat
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
