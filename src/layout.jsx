import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function Layout() {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main>{<Outlet />}</main>
    </div>
  );
}

export default Layout;
