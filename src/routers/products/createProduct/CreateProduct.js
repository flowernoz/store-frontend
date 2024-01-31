import React from "react";
import "./CreateProduct.css";
import { useState } from "react";
import Code from "../../../components/code/Code";
import BtnLoader from "../../../components/btnLoader/BtnLoader";

const CreateProduct = () => {
  const [loader, setLoader] = useState(false);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");
  const [orgPrices, setOrgPrices] = useState("");
  const [prices, setPrices] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const categoryData = [
    "Kategoriyani tanalang",
    "Konst tavar",
    "Tozalov vosiatsi",
    "Qog'oz",
    "Temir",
    "Kiraska",
    "Shupirgi",
    "Santexnik anjomlar",
  ];

  const createPro = (e) => {
    e.preventDefault();

    let data = {
      title,
      size,
      orgPrices: +orgPrices,
      prices: +prices,
      color,
      brand,
      subCategory,
      category,
    };

    setLoader(true);
    setTimeout(() => {
      setLoader(false);

      setOpenBarcode(true);
    }, 500);
  };
  return (
    <div className="create_product_page">
      {openBarcode && (
        <Code text={"Muhammadsoleh"} setOpenBarcode={setOpenBarcode} />
      )}
      <div className="container">
        <div className="create_product_container">
          <div className="create_product_header">
            <h2>Create products</h2>
          </div>
          <div className="create_product_form_container">
            <form onSubmit={createPro}>
              <div className="form_container">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Title"
                />
                <input
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  type="text"
                  placeholder="Size"
                />
                <input
                  value={orgPrices}
                  onChange={(e) => setOrgPrices(e.target.value)}
                  type="text"
                  placeholder="Original prices"
                />
                <input
                  value={prices}
                  onChange={(e) => setPrices(e.target.value)}
                  type="text"
                  placeholder="Prices"
                />
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type="text"
                  placeholder="Color"
                />
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  type="text"
                  placeholder="Brand"
                />
                <input
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  type="text"
                  placeholder="Sub category"
                />
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  placeholder="New category"
                />
                <select onChange={(e) => setCategory(e.target.value)}>
                  {categoryData?.map((i, inx) => (
                    <option key={inx} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form_btn">
                <button>{loader && <BtnLoader />} Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
