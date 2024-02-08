import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { FaRegCalendarAlt, FaRegCalendarPlus } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function Layout() {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main className="strange">
        <aside>
          <Link to={"/"}>
            <IoHomeOutline />
            Bosh sahifa
          </Link>
          <Link to={"/product"}>
            <BiGridAlt />
            mahsulotlar
          </Link>
          <Link to={"/createProduct"}>
            <HiOutlineViewGridAdd />
            mahsulot qo'shish
          </Link>
          <Link to={"/nasiya"}>
            <FaRegCalendarAlt />
            Nasiya
          </Link>
          <Link to={"/nasiyacreate"}>
            <FaRegCalendarPlus />
            Nasiya qo'shish
          </Link>
          <Link to={"/cart"}>
            <AiOutlineShoppingCart />
            cart
          </Link>
        </aside>
        {<Outlet />}
      </main>
    </div>
  );
}

export default Layout;
