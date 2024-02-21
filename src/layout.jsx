import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaCashRegister, FaUserCog } from "react-icons/fa";
import { useCart } from "./redux/selectors";

function Layout() {
  const [state, setState] = useState(false);
  const cart = useCart();
  let cartLength = cart.reduce((a, b) => a + b.quantity, 0);
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
          <NavLink to={"/popular"}>
            <FaMoneyBillTrendUp />
            {!state ? "ommabop" : ""}
          </NavLink>
          <NavLink to={"/createProduct"}>
            <HiOutlineViewGridAdd />
            {!state ? "mahsulot qo'shish" : ""}
          </NavLink>
          <NavLink to={"/nasiya"}>
            <FaRegCalendarAlt />
            {!state ? " Nasiya" : ""}
          </NavLink>
          <NavLink to={"/cart"}>
            <AiOutlineShoppingCart />
            {!state ? "Savat" : ""}
            {cartLength?.length && (
              <span className="cart_length">{cartLength}</span>
            )}
          </NavLink>
          <NavLink to={"/register"}>
            <FaCashRegister />
            {!state ? "Ro'yxatdan o'tish" : ""}
          </NavLink>
          <NavLink to={"/registered"}>
            <FaUserCog />
            {!state ? "Adminlar" : ""}
          </NavLink>
        </aside>
        {<Outlet />}
      </main>
    </div>
  );
}

export default Layout;
