import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Sidebar.css";
// ======== ICONS  ========= \\
import { IoMdClose, IoIosStats } from "react-icons/io";
import {
  LiaPhoneVolumeSolid,
  LiaFacebookF,
  LiaTelegramPlane,
} from "react-icons/lia";
import { LuCalendarClock, LuInstagram } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FcAbout, FcBusinessContact } from "react-icons/fc";

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
          <Link to={"/"}>
            {" "}
            <FcAbout />
            Daromad
          </Link>
          <Link to={"/cart"}>
            <IoIosStats className="service__icon" />
            Statistika
          </Link>
          <Link to={"/nasiya"}>
            <FcBusinessContact />
            nasiya
          </Link>
        </div>
        {/*======== SIDEBAR TOP ======= */}
        <div className="sidebar__top">
          <div className="sidebar__working__days">
            <LuCalendarClock />
            <span>
              Dushanba-Yakshanba: 7<sup>00</sup> - 22<sup>00</sup>
            </span>
          </div>
          <a className="sidebar__call" href="tel:+998932620323">
            <LiaPhoneVolumeSolid className="call__icon" />
            <span>+998(93)9119572</span>
          </a>
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
