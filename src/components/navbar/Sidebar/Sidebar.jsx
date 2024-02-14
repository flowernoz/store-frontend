import { NavLink, Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Sidebar.css";
// ======== ICONS  ========= \\
import { IoMdClose } from "react-icons/io";
import { LiaFacebookF, LiaTelegramPlane } from "react-icons/lia";
import { LuInstagram } from "react-icons/lu";
import { BiGridAlt } from "react-icons/bi";
import { FaRegCalendarAlt, FaRegCalendarPlus } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

function Sidebar({ closeSidebarFunc }) {
  return (
    <>
      <div className="Sidebar">
        <div className="sidebar__head">
          <Link to={"/"} className="sidebar__logo">
            <img src={logo} alt="logo" />
          </Link>
          <IoMdClose className="sidebarClose" onClick={closeSidebarFunc} />
        </div>

        {/*  SIDEBAR LINKS */}
        <div className="sidebar__links">
          <NavLink to={"/"}>
            <IoHomeOutline />
            bosh sahifa
          </NavLink>
          <NavLink to={"/product"}>
            <BiGridAlt />
            Mahsulotlar
          </NavLink>
          <NavLink to={"/popular"}>
            <FaMoneyBillTrendUp />
            ommabop Mahsulotlar
          </NavLink>
          <NavLink to={"/createProduct"}>
            <HiOutlineViewGridAdd />
            mahsulot qo'shish
          </NavLink>
          <NavLink to={"/nasiya"}>
            <FaRegCalendarAlt />
            nasiya
          </NavLink>
          <NavLink to={"/nasiyacreate"}>
            <FaRegCalendarPlus />
            Nasiya qo'shish
          </NavLink>
          <NavLink to={"/cart"}>
            <AiOutlineShoppingCart className="service__icon" />
            Savat
          </NavLink>
        </div>
        {/*========= SIDEBAR BOTTOM ======== */}
        <div className="sidebar__bottom">
          {/* SIDEBAR NETWORKS */}
          <div className="sidebar__networks">
            <a href="https://instagram.com">
              {" "}
              <LuInstagram />{" "}
            </a>
            <a href="https://facebook.com">
              {" "}
              <LiaFacebookF />{" "}
            </a>
            <a href="https://t.me">
              {" "}
              <LiaTelegramPlane />{" "}
            </a>
          </div>
        </div>
      </div>
      <div onClick={closeSidebarFunc} className="overlay"></div>
    </>
  );
}

export default Sidebar;
