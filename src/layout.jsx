import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import { useCart } from "./redux/selectors";

import asideData from "./static/asideData";
// import { useGetCreditAmountUsersQuery } from "./redux/creditAmountApi";

function Layout() {
  const [state, setState] = useState(false);
  const cart = useCart();
  let cartLength = cart.reduce((a, b) => a + b.quantity, 0);

  let { role } = JSON.parse(sessionStorage.getItem("userInfo"));

  // const { data } = useGetCreditAmountUsersQuery();

  // console.log(data);

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

          {asideData[role].map((item, inx) => (
            <NavLink key={inx} to={item?.link}>
              {item?.icon}
              {!state ? item?.title : ""}
              {cartLength > 0 && (
                <span className={item?.class}>
                  {item?.link === "/cart" && cartLength}
                </span>
              )}
            </NavLink>
          ))}
        </aside>
        {<Outlet />}
      </main>
    </div>
  );
}

export default Layout;
