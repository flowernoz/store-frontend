import { GoNumber } from "react-icons/go";
import {
  MdOutlinePriceCheck,
  MdOutlineTitle,
  MdOutlineNumbers,
} from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { TfiRulerAlt } from "react-icons/tfi";
import { GiMoneyStack } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";

const cartData = [
  {
    icon: <MdOutlineNumbers />,
  },
  {
    icon: <MdOutlineTitle />,
  },
  {
    icon: <GiMoneyStack />,
  },
  {
    icon: <TfiRulerAlt />,
  },
  {
    icon: <IoIosColorPalette />,
  },
  {
    icon: <MdOutlinePriceCheck />,
  },
  {
    icon: <GoNumber />,
  },
  {
    icon: <FaTrash />,
    id: 6,
  },
];

export default cartData;
