import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./barCodeReader.css";
import BarCodeScan from "./barCodeScan/BarCodeScan";
import { IoMdClose } from "react-icons/io";
import { AddToCart } from "../../redux/cart";
import { toast } from "react-toastify";
import { useGetScanerDataMutation } from "../../redux/scanerApi";

function BarCodeReader({ setOpenQrScanner }) {
  const [getScanerData] = useGetScanerDataMutation();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [totalquantity, setTotalQuantity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState("");
  const onNewScanResult = (decodedText, decodedResult) => {
    setId(decodedText);
  };
  useEffect(() => {
    getScanerData({ barcode: id })
      .then((res) => {
        setData(res?.data?.innerData);
        setPrice(res?.data?.innerData?.price);
        setTotalQuantity(res?.data?.innerData?.quantity);
        setTotalPrice(res?.data?.innerData?.price);
      })
      .catch((res) => console.log(res));
  }, [id.length]);

  // COUNTING TOTALPRICE

  function calculatePrice(e) {
    setQuantity(e);
    setTotalPrice(e * price);
    setTotalQuantity(data?.quantity - e);
  }

  // ADDING TO CART SELECTED ITEM
  function addToCart(cart) {
    const updatedCart = {
      ...cart,
      quantity: +quantity,
      price: +price,
      totalPrice: +totalPrice,
    };
    dispatch(AddToCart(updatedCart));
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
          <span>
            Bazadagi miqdori:
            <b> {totalquantity}</b>
          </span>
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
          <span>
            Umumiy narxi:
            <b>{totalPrice}</b>
          </span>
          <div className="scanned__btns">
            <button
              onClick={() => {
                setData(null);
                setId("");
              }}
            >
              bekor qilish
            </button>
            <button onClick={() => addToCart(data)}>Qo'shish</button>
          </div>
        </div>
      )}
      <h1>{id}</h1>
    </div>
  );
}

export default BarCodeReader;
