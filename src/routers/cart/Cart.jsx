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
import { toast } from "react-toastify";
import { FaHandPointRight } from "react-icons/fa";

function Cart() {
  const cart = useCart();
  const dispatch = useDispatch();

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
      .patch("/pro/updateQty", cart)
      .then((res) => {
        if (res.data?.innerData?.status === "success") {
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

  return (
    <div className="main_cart_home">
      <div className="container">
        <table className="fl-table buy_table">
          <caption>Sotiladigan Tovarlar</caption>
          <thead>
            <tr>
              <th>№</th>
              <th>nomi</th>
              <th>narx</th>
              <th>razmer</th>
              <th>rangi</th>
              <th>Nechta</th>
              <th>Umumiy narx</th>
              <th onClick={clearCart}>
                <FaTrash />
              </th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((i, inx) => (
              <tr key={inx}>
                <td>{inx + 1}</td>
                <td>{i?.title}</td>
                <td>{i?.price}</td>
                <td>{i?.size}</td>
                <td>{i?.color}</td>
                <td>
                  <button
                    className="plus_minus"
                    disabled={i?.quantity == 1}
                    onClick={() => decrementCart(i?._id)}
                  >
                    <FaMinus />
                  </button>
                  <span>{i.quantity}</span>
                  <button
                    className="plus_minus"
                    onClick={() => incrementCart(i?._id)}
                  >
                    <FaPlus />
                  </button>
                </td>
                <td>{i?.totalPrice}</td>
                <td>
                  <button
                    className="delete_cart"
                    onClick={() => handleDelete(i?._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={"2"}>Mahsulotlarni Sotib Olish</td>
              <td>
                <marquee direction="right">
                  <FaHandPointRight className="right_animation" />
                </marquee>
              </td>
              <td colSpan={"2"}>
                <p>{subtotal + " UZS"}</p>
              </td>
              <td className="nasiya_sotish_btn">Nasiyaga Sotish</td>
              <td className="naxtga_sotish" colSpan={"2"} onClick={checkout}>
                Naxtga Sotish
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Cart;
