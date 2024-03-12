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
import { toast, ToastContainer } from "react-toastify";
import empty from "../../assets/empty1.png";
import CriditRegister from "../../components/criditRegister/CriditRegister";
import { useState } from "react";
import cartData from "../../static/cartIcon";
import { useQuantityUpdateMutation, useSoldProductsMutation } from "../../redux/rePortApi"
function Cart() {
  const cart = useCart();
  const dispatch = useDispatch();
  const [openRgister, setOpenRgister] = useState(false);
  const [quantityUpdate] = useQuantityUpdateMutation();
  const [soldProducts] = useSoldProductsMutation();
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
  async function checkout( ) {
    try {
     await soldProducts(cart);
     await quantityUpdate(cart)
      dispatch(ClearCart());
              toast.success("Mahsulotlar sotildi!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
              });
    } catch (err) {
      console.log(err);
    }
  }

  // cridit register function
  const register = () => {
    setOpenRgister(true);
  };

  openRgister
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="cart_page">
      <ToastContainer />
      {openRgister && (
        <CriditRegister close={setOpenRgister} totalPrice={subtotal} />
      )}
      {cart.length ? (
        <div className="cart_container">
          <div className="cart_header">
            <h1>Sotiladigan Tovarlar</h1>
            {/* <div className="search_container">
              <input type="text" name="firstname" placeholder="Qidirish..." />
              <select name="phone">
                <option>Kategoriya qidirish</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
              </select>
            </div> */}
          </div>
          <div className="cart_table_container">
            <ToastContainer/>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Razmer</th>
                  <th>Narxi</th>
                  <th>Olchami</th>
                  <th>Rangi</th>
                  <th>Umumiy narxi</th>
                  <th>Soni</th>
                  <th onClick={clearCart}>
                    <FaTrash />
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((i, inx) => (
                  <tr key={inx}>
                    <td data_lable="#">{inx + 1}</td>
                    <td data_lable="Razmer">
                      {i?.title ? i?.title : <FaMinus />}
                    </td>
                    <td data_lable="Narxi">{i?.price ? i?.price : 0}</td>
                    <td data_lable="Olchami">
                      {i?.size ? i?.size : <FaMinus />}
                    </td>
                    <td data_lable="Rangi">
                      {i?.color ? i?.color : <FaMinus />}
                    </td>
                    <td data_lable="Umumiy narxi">
                      {i?.totalPrice ? i?.totalPrice : 0}
                    </td>
                    <td data_lable="Soni">
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
                    <td data_lable="O'zgartirish">
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
                <button  onClick={checkout}>Naxtga sotib olish</button>
                <button onClick={register}>Nasiyaga sotib olish</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty_cart">
          <img src={empty} alt="image" />
        </div>
      )}
    </div>
  );
}

export default Cart;
