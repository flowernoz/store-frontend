import { IoHomeOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaCashRegister, FaRegCalendarAlt, FaUserCog } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi";

let asideData = {
  admin: [
    { icon: <IoHomeOutline />, title: "Bosh sahifa", link: "/", id: 0 },
    { icon: <BiGridAlt />, title: "Mahsulotlar", link: "/product", id: 1 },
    { icon: <FaMoneyBillTrendUp />, title: "Ommabop", link: "/popular", id: 2 },
    {
      icon: <HiOutlineViewGridAdd />,
      title: "Mahsulot qo'shish",
      link: "/createProduct",
      id: 3,
    },
    { icon: <FaRegCalendarAlt />, title: "Nasiya", link: "/nasiya", id: 4 },
    {
      icon: <AiOutlineShoppingCart />,
      title: "Savat",
      link: "/cart",
      class: "cart_length",
      id: 5,
    },
  ],
  owner: [
    { icon: <IoHomeOutline />, title: "Bosh sahifa", link: "/", id: 0 },
    { icon: <BiGridAlt />, title: "Mahsulotlar", link: "/product", id: 1 },
    { icon: <FaMoneyBillTrendUp />, title: "Ommabop", link: "/popular", id: 2 },
    {
      icon: <HiOutlineViewGridAdd />,
      title: "Mahsulot qo'shish",
      link: "/createProduct",
      id: 3,
    },
    { icon: <FaRegCalendarAlt />, title: "Nasiya", link: "/nasiya", id: 4 },
    {
      icon: <AiOutlineShoppingCart />,
      title: "Savat",
      link: "/cart",
      class: "cart_length",
      id: 5,
    },
    {
      icon: <FaCashRegister />,
      title: "Ro'yxatdan o'tish",
      link: "/register",
      id: 6,
    },
    { icon: <FaUserCog />, title: "Adminlar", link: "/registered", id: 7 },
  ],
};

export default asideData;
