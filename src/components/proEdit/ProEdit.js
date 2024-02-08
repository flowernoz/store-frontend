import React, { memo, useState } from "react";
import "./ProEdit.css";
import { MdClose } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";

const ProEdit = ({ close, data }) => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [orgPrice, setOrgPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState(Number());
  const [subcategory, setSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);
  console.log(data);
  let plusCount = () => {};
  let minusCount = () => {};
  return (
    <div className="pro_edit_page">
      <div className="container">
        <div className="pro_edit_container">
          <form>
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
                    <button>
                      <FiMinus />
                    </button>
                    <span>{count}</span>
                    <button>
                      <FiPlus />
                    </button>
                  </div>
                  <input placeholder="Miqdor qoshish" type="text" />
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
