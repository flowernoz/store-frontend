import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./barCodeReader.css";
import BarCodeScan from "./barCodeScan/BarCodeScan";
import { IoMdClose } from "react-icons/io";
import axios from "../../api";
import { AddToCart } from "../../redux/cart";
import { toast } from "react-toastify";

function BarCodeReader({ setOpenQrScanner }) {
  const dispatch = useDispatch();
  let [data, setData] = useState(null);
  let [id, setId] = useState("");
  let [price, setPrice] = useState("");
  let [totalquantity, setTotalQuantity] = useState("");
  let [quantity, setQuantity] = useState(1);
  let [totalPrice, setTotalPrice] = useState("");
  const onNewScanResult = (decodedText, decodedResult) => {
    setId(decodedText);
  };
  useEffect(() => {
    axios
      .post("/pro/scan", { barcode: id })
      .then((res) => {
        setData(res.data.innerData);
        setPrice(res.data.innerData.price);
        setTotalQuantity(res.data.innerData.quantity);
        setTotalPrice(res.data.innerData.price);
      })
      .catch((res) => console.log(res));
  }, [id.length]);

  // COUNTING TOTALPRICE

  function calculatePrice(e) {
    setQuantity(e);
    setTotalPrice(e * price);
    setTotalQuantity(data.quantity - e);
  }

  // ADDING TO CART SELECTED ITEM
  function addToCart(cart) {
    cart.quantity = +quantity;
    cart.price = +price;
    cart.totalPrice = +totalPrice;
    dispatch(AddToCart(cart));
    toast.success("Mahsulot Savatga qo'shildi !", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
    });
    setId("");
    setData(null);
  }

  return (
    <div className="barCodeReader">
      <IoMdClose onClick={() => setOpenQrScanner(false)} className="barClose" />
      {/* {!data ? (
        <BarCodeScan
          fps={10}
          qrbox={450}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
          id={id}
        />
      ) : (
        <div className="scanned">
          <p>{data?.title}</p>
          <span>
            asl narxi: <b>{data?.orgPrice}</b>
          </span>
          <div>
            <label>Sotiladigan narxi:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setTotalPrice(e.target.value * quantity);
              }}
            />
          </div>
          <div>
            <label>Bazadagi miqdori:</label>
            <input className="totalqnty" type="text" value={totalquantity} />
          </div>
          <div>
            <label>Sotiladigan miqdori:</label>
            <input
              min={1}
              type="number"
              value={quantity}
              onChange={(e) => {
                calculatePrice(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Umumiy narxi:</label>
            <input
              type="text"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              className="totalprice"
            />
          </div>
          <div className="scanned__btns">
            <button onClick={() => setData("")}>bekor qilish</button>
            <button onClick={() => addToCart(data)}>Qo'shish</button>
          </div>
        </div>
      )} */}

      {!data ? (
        <BarCodeScan
          fps={10}
          qrbox={450}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
          id={id}
        />
      ) : (
        <div className="scanned">
          <p>nomi: {data?.title}</p>
          <div className="scaner_item">
            <label>asl narxi:</label>
            <span>{data?.orgPrice + " so'm"}</span>
          </div>
          <div className="scaner_item">
            <label>Sotiladigan narxi:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setTotalPrice(e.target.value * quantity);
              }}
            />
          </div>
          <div className="scaner_item">
            <label>Bazadagi miqdori:</label>
            <input type="text" value={totalquantity} />
          </div>
          <div className="scaner_item">
            <label>kategoriyasi:</label>
            <span>{data?.category}</span>
          </div>
          <div className="scaner_item">
            <label>Sotiladigan miqdori:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                calculatePrice(e.target.value);
              }}
            />
          </div>
          <div className="scaner_item">
            <label>Umumiy narxi:</label>
            <input
              type="text"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
            />
          </div>

          <div className="scanned__btns">
            <button onClick={() => setData(null)}>bekor qilish</button>
            <button onClick={() => addToCart(data)}>Qo'shish</button>
          </div>
        </div>
      )}

      <h1>{id}</h1>
    </div>
  );
}

export default BarCodeReader;
