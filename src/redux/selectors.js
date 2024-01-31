import { useSelector } from "react-redux";

export const useCart = () => useSelector(({ cart }) => cart);
