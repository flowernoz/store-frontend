import React, { useRef } from "react";
import "./UserPrint.css";
import { BsFillPrinterFill, BsX } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import iMartImg from "../../assets/imartChackImg.jpeg";

function UserPrint({ userPrintData, setOpenPrint }) {
  const componentRef = useRef();

  let data = userPrintData;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // styling
    pageStyle: () => `
      @page {
        size: 60mm 85.8mm;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
        }
        .update_code_container {
          height: 100;
        }
      }
    `,
  });

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  const close = () => {
    setOpenPrint(false);
  };
  return (
    <div className="user_print">
      <div className="container">
        <div className="user_print_container">
          <div className="user_print_header">
            <button onClick={close}>
              <BsX />
            </button>
            <button className="printer" onClick={handlePrint}>
              <BsFillPrinterFill />
            </button>
          </div>
          <div ref={componentRef} className="user_print_card_container">
            <div className="user_print__header">
              <div className="chack_img">
                <img src={iMartImg} alt="" />
              </div>
              <h2>To'lov cheki</h2>
            </div>
            <div className="user_print_card">
              <ul>
                <li>
                  <span>To'lov:</span>
                  <p>{formatNumber(data?.pricePaid)}</p>
                </li>
                <li>
                  <span>Oldingi qarzi:</span>
                  <p>{formatNumber(data?.totalPrice)}</p>
                </li>
                <li>
                  <span>Qolgan qarzi:</span>
                  <p>{formatNumber(data?.remainingDebt)}</p>
                </li>
                <li>
                  <span>Kuni:</span>
                  <p>{data?.paymentDate.split(" ")[0]}</p>
                </li>
                <li>
                  <span>Soat:</span>
                  <p>{data?.paymentDate.split(" ")[1]}</p>
                </li>

                <li>
                  <span>Ism:</span>
                  <p>{data?.firstname}</p>
                </li>
                <li>
                  <span>Familiya:</span>
                  <p>{data?.lastname}</p>
                </li>
                <li>
                  <span>Address:</span>
                  <p>{data?.address}</p>
                </li>
                <li>
                  <span>Nomer:</span>
                  <p>{data?.phone}</p>
                </li>
                <li>
                  <span>Pasport raqami:</span>
                  <p>{data?.passport}</p>
                </li>
              </ul>
            </div>
            <div className="user_print_chack_border">
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
              <dir className="chack_border"></dir>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPrint;
