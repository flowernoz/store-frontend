import { useEffect, useState } from "react";
import "./CreateProduct.css";
import Code from "../../components/code/Code";
import BtnLoader from "../../components/btnLoader/BtnLoader";
import { SiAddthis } from "react-icons/si";
import { MdArrowDropDownCircle } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
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

  // ------------------------------------------------

  // input qiymatiga bosh string qoshish ochun
  const [qnt, setQnt] = useState("");
  const [orgPrice, setOrgPrice] = useState("");
  const [price, setPrice] = useState("");

  // toza qiymat olish uchun
  const [clenQntValue, setClenQntValue] = useState("");
  const [clenOrgPriceValue, setClenOrgPriceValue] = useState("");
  const [clenPriceValue, setClenPriceValue] = useState("");

  // input qiymatini orasiga bosh string qoshib beradigan funftion
  const formatNumber = (qiymat) => {
    return qiymat.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const qntChange = (e) => {
    const value = e.target.value;
    const orgValue = value.replace(/\D/g, "");
    const formatValue = formatNumber(value);

    setQnt(formatValue);
    setClenQntValue(orgValue);
  };

  const orgPriceChange = (e) => {
    const value = e.target.value;
    const orgValue = value.replace(/\D/g, "");
    const formatValue = formatNumber(value);

    setOrgPrice(formatValue);
    setClenOrgPriceValue(orgValue);
  };

  const priceChange = (e) => {
    const value = e.target.value;
    const orgValue = value.replace(/\D/g, "");
    const formatValue = formatNumber(value);

    setPrice(formatValue);
    setClenPriceValue(orgValue);
  };

  // Misol uchun, backendga yuborish funksiyasi
  const backendgaYuborish = () => {
    console.log("Backendga yuboriladigan qiymat:", clenQntValue);
    console.log("Backendga yuboriladigan qiymat:", clenOrgPriceValue);
    console.log("Backendga yuboriladigan qiymat:", clenPriceValue);
    // Bu yerda backendga so'rov yuborish logikasi bo'ladi
  };
  // ------------------------------------------------

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
    data.price = +clenPriceValue;
    data.orgPrice = +clenOrgPriceValue;
    data.quantity = +clenQntValue;
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
          setPrice("");
          setOrgPrice("");
          setQnt("");
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

      <ToastContainer />
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
                type="text"
                placeholder="asl narxi"
                name="orgPrice"
                value={orgPrice}
                onChange={orgPriceChange}
                className="numberInput"
              />
              <input
                required
                type="text"
                placeholder="Sotiladigan narxi"
                name="price"
                value={price}
                onChange={priceChange}
                className="numberInput"
              />
              <input
                required
                type="text"
                placeholder="miqdori"
                name="quantity"
                value={qnt}
                onChange={qntChange}
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
              <button>{loader && <BtnLoader />} Saqlash</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
