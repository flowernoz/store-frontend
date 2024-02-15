import "./Cart.css";
import { useCart } from "../../redux/selectors";
import {
  ClearCart,
  RemoveFromCart,
  IncrementCart,
  DecrementCart,
} from "../../redux/cart";
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import axios from "../../api";
import { toast, ToastContainer } from "react-toastify";
import empty from "../../assets/empty1.png";
import CriditRegister from "../../components/criditRegister/CriditRegister";
import { useState } from "react";
import { GoNumber } from "react-icons/go";
import { MdOutlinePriceCheck, MdOutlineTitle } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { TfiRulerAlt } from "react-icons/tfi";

function Cart() {
  const cart = useCart();
  const dispatch = useDispatch();
  const [openRgister, setOpenRgister] = useState(false);

  // delete item
  function handleDelete(id) {
    let warning = window.confirm("Savatni bo'shatishni xohlaysizmi?");
    if (warning) {
      dispatch(RemoveFromCart(id));
      toast.success("Mahsulot o'chirildi", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  }

  function incrementCart(id) {
    dispatch(IncrementCart({ id }));
  }

  function decrementCart(id) {
    dispatch(DecrementCart({ id }));
  }

  function clearCart() {
    let warning = window.confirm("Savatni bo'shatishni xohlaysizmi?");
    if (warning) {
      dispatch(ClearCart());
      toast.success("Savat bo'shatildi", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  }

  let subtotal = cart.reduce((a, b) => a + b.totalPrice, 0);

  function checkout() {
    axios
      .post("/soldPro/create", cart)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
    axios
      .patch("/pro/updateQty", cart)
      .then((res) => {
        console.log(res.data.status);
        if (res.data?.status === "success") {
          dispatch(ClearCart());
          toast.success("Mahsulotlar sotildi!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  // cridit register function
  const register = () => {
    setOpenRgister(true);
  };

  openRgister
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="main_cart_home">
      {cart.length ? (
        <>
          <ToastContainer />
          {openRgister && (
            <CriditRegister close={setOpenRgister} totalPrice={subtotal} />
          )}
          <div className="cart_table_container">
            <table>
              <caption>Sotiladigan Tovarlar</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <span className="num_icon">
                      <MdOutlineTitle />
                    </span>
                    <span className="text">Razmer</span>
                  </th>
                  <th>Narxi</th>
                  <th>
                    <span className="num_icon">
                      <TfiRulerAlt />
                    </span>
                    <span className="text">Razmer</span>
                  </th>
                  <th>
                    <span className="num_icon">
                      <IoIosColorPalette />
                    </span>
                    <span className="text">Rang</span>
                  </th>
                  <th>
                    <span className="num_icon">
                      <MdOutlinePriceCheck />
                    </span>
                    <span className="text">Umumiy narxi</span>
                  </th>
                  <th>
                    <span className="num_icon">
                      <GoNumber />
                    </span>

                    <span className="text">Soni</span>
                  </th>
                  <th onClick={clearCart}>
                    <FaTrash />
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((i, inx) => (
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>{i?.title ? i?.title : <FaMinus />}</td>
                    <td>{i?.price ? i?.price + " ming" : 0}</td>
                    <td>{i?.size ? i?.size : <FaMinus />}</td>
                    <td>{i?.color ? i?.color : <FaMinus />}</td>
                    <td>{i?.totalPrice + " so'm"}</td>
                    <td>
                      <div className="table_butons">
                        <button
                          className="plus_minus"
                          disabled={i?.quantity === 1}
                          onClick={() => decrementCart(i?.barcode)}
                        >
                          <FaMinus />
                        </button>
                        <span>{i.quantity}</span>
                        <button
                          className="plus_minus"
                          onClick={() => incrementCart(i?.barcode)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="table_trash"
                        onClick={() => handleDelete(i?.barcode)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart_tfoot">
              <div className="cart_tfoot_title">
                <h2>Sotib olingan mahulotlar</h2>
              </div>
              <div className="cart_tfoot_totall">
                <ul>
                  <li>
                    <span className="li_title">Malumotlar soni:</span>
                    <h2>
                      {cart?.length} <span>Ta</span>
                    </h2>
                  </li>
                  <li>
                    <span className="li_title">Umumiy narxi:</span>
                    <h2>
                      {subtotal} <span> so'm</span>
                    </h2>
                  </li>
                </ul>
              </div>
              <div className="cart_tfoot_btn">
                <button onClick={checkout}>Naxtga sotib olish</button>
                <button onClick={register}>Nasiyaga sotib olish</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="empty_cart">
          <img src={empty} alt="" />
        </div>
      )}
    </div>
  );
}

export default Cart;
