import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import {
  FaArrowAltCircleLeft,
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaRegCalendarAlt,
  FaRegCalendarPlus,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
function Layout() {
  const [state, setState] = useState(false);
  return (
    <div className="layout">
      <header className="head">
        <Navbar />
      </header>

      <main className="strange">
        <aside style={!state ? { width: "100%" } : { width: "auto" }}>
          <button onClick={() => setState(!state)}>
            {!state ? <FaArrowCircleLeft /> : <FaArrowCircleRight />}
          </button>
          <NavLink to={"/"}>
            <IoHomeOutline />
            {!state ? "Bosh sahifa" : ""}
          </NavLink>
          <NavLink to={"/product"}>
            <BiGridAlt />
            {!state ? "mahsulotlar" : ""}
          </NavLink>
          <NavLink to={"/createProduct"}>
            <HiOutlineViewGridAdd />
            {!state ? "mahsulot qo'shish" : ""}
          </NavLink>
          <NavLink to={"/nasiya"}>
            <FaRegCalendarAlt />
            {!state ? " Nasiya" : ""}
          </NavLink>
          <NavLink to={"/nasiyacreate"}>
            <FaRegCalendarPlus />
            {!state ? "Nasiya qo'shish" : ""}
          </NavLink>
          <NavLink to={"/cart"}>
            <AiOutlineShoppingCart />
            {!state ? "Savat" : ""}
          </NavLink>
        </aside>
        {<Outlet />}
      </main>
    </div>
  );
}

export default Layout;
