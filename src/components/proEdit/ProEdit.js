import React, { memo, useEffect, useState } from "react";
import "./ProEdit.css";
import { MdClose } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
// PRODUCT API =>
import { useProductUpdateMutation } from "../../redux/productApi";
import { toast, ToastContainer } from "react-toastify";

const ProEdit = ({ close, data }) => {
  const [productUpdate] = useProductUpdateMutation();

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [orgPrice, setOrgPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setBrand(data.brand);
    setCategory(data.category);
    setColor(data.color);
    setOrgPrice(data.orgPrice);
    setPrice(data.price);
    setSize(data.size);
    setSubcategory(data.category);
    setTitle(data.title);
    setCount(data.quantity);
  }, [data]);

  let plusCount = () => {
    setCount(count + 1);
  };
  let minusCount = () => {
    if (count <= 0) {
      return setCount(0);
    }
    setCount(count - 1);
  };

  const proFormData = async (e) => {
    e.preventDefault();
    let proData = {
      brand,
      category,
      color,
      orgPrice: +orgPrice,
      price: +price,
      size,
      subcategory,
      title,
      quantity: count,
    };

    await productUpdate({ _id: data?._id, updateData: proData })
      .then((res) => {
        if (res?.data?.status) {
          toast.success("Muvaffaqiyatli o'zgartirish kiritildi", {
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
          close(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="pro_edit_page">
      <div className="container">
        <div className="pro_edit_container">
          <form onSubmit={proFormData}>
            <div className="form_title">
              <h2>Malumotlarni tahrirlash</h2>
              <button onClick={() => close(false)}>
                <MdClose />
              </button>
            </div>
            <div className="form_inputs_container">
              <div className="input_container">
                <label>Nomi</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
              </div>
              <div className="input_container">
                <label>O'lchami</label>
                <input
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  type="text"
                />
              </div>
              <div className="input_container">
                <label>asl narxi</label>
                <input
                  value={orgPrice}
                  onChange={(e) => setOrgPrice(e.target.value)}
                  type="text"
                />
              </div>
              <div className="input_container">
                <label>Sotiladigan narxi</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input_container">
                <label>rangi</label>
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type="text"
                />
              </div>
              <div className="input_container">
                <label>Brand</label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  type="text"
                />
              </div>
              <div className="input_container">
                <label>Sub kategoriyasi</label>
                <input
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  type="text"
                />
              </div>
              <div className="input_container">
                <label>kategoriyasi</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                />
              </div>
              <div className="input_container">
                <label>miqdori</label>
                <div className="inputs_container">
                  <div className="input_btns_container">
                    <div className="count_btn" onClick={minusCount}>
                      <FiMinus />
                    </div>
                    <span>{count}</span>
                    <div className="count_btn" onClick={plusCount}>
                      <FiPlus />
                    </div>
                  </div>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Miqdor qoshish"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="form_btn_container">
              <button>Qo'shish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(ProEdit);
