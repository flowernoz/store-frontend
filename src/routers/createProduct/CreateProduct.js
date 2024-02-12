import { useEffect, useState } from "react";
import "./CreateProduct.css";
import Code from "../../components/code/Code";
import BtnLoader from "../../components/btnLoader/BtnLoader";
import axios from "../../api";
import { SiAddthis } from "react-icons/si";
import { MdArrowDropDownCircle } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
} from "../..//redux/productApi";

const CreateProduct = () => {
  const { data, error } = useGetAllProductsQuery();
  const [addPost] = useAddProductMutation();
  const [loader, setLoader] = useState(false);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [addCategory, setAddCategory] = useState(false);

  function generateUniqueNumber() {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000000);
    const uniqueNumber = `${timestamp}${randomPart}`;
    const finalUniqueNumber = uniqueNumber.slice(0, 12);
    return finalUniqueNumber;
  }
  let barcode = generateUniqueNumber();

  useEffect(() => {
    const uniqueCategories = [];
    const filteredProducts = data?.innerData?.filter((product) => {
      if (!uniqueCategories.includes(product.category)) {
        return uniqueCategories.push(product.category);
      }
    });
    setCategoryData(uniqueCategories);
  }, [data]);

  const createPro = async (e) => {
    e.preventDefault();
    let newData = new FormData(e.target);
    let data = Object.fromEntries(newData);
    data.price = +data.price;
    data.orgPrice = +data.orgPrice;
    data.quantity = +data.quantity;
    data.barcode = barcode;
    setLoader(true);

    await addPost(data)
      .then((res) => {
        if (res.data?.innerData?.barcode) {
          toast.success("Mahsulot bazaga qo'shildi !", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
          });
          setLoader(false);
          setCategoryId(barcode);
          setOpenBarcode(true);
          document.form__create.reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create_product_page">
      {openBarcode && (
        <Code text={categoryId} setOpenBarcode={setOpenBarcode} />
      )}
      <div className="create_product_container">
        <div className="create_product_header">
          <h2>Mahsulot qo'shish</h2>
        </div>
        <div className="create_product_form_container">
          <form name="form__create" onSubmit={createPro}>
            <div className="form_container">
              <input required type="text" placeholder="Nomi" name="title" />
              <input type="text" placeholder="O'lchami" name="size" />
              <input
                required
                type="number"
                placeholder="asl narxi"
                name="orgPrice"
                className="numberInput"
              />
              <input
                required
                type="number"
                placeholder="Sotiladigan narxi"
                name="price"
                className="numberInput"
              />
              <input
                required
                type="number"
                placeholder="miqdori"
                name="quantity"
                className="numberInput"
              />
              <input type="text" placeholder="rangi" name="color" />
              <input type="text" placeholder="Brand" name="brand" />
              <input
                type="text"
                placeholder="Sub kategoriyasi"
                name="subcategory"
              />
              <div className="select__box">
                {!addCategory && <MdArrowDropDownCircle className="dropDown" />}
                {!addCategory ? (
                  <select name="category">
                    {categoryData?.length ? (
                      categoryData?.map((i, inx) => (
                        <option key={inx} value={i}>
                          {i}
                        </option>
                      ))
                    ) : (
                      <option>Hozircha kategoriya yo'q</option>
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Yangi kategoriya qo'shish"
                    name="category"
                  />
                )}
                <span onClick={(e) => setAddCategory(!addCategory)}>
                  <SiAddthis />
                </span>
              </div>
            </div>
            <div className="form_btn">
              <button>{loader && <BtnLoader />} Qo'shish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
