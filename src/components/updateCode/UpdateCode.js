import React, { useRef } from "react";
import "./UpdateCode.css";
import Barcode from "react-barcode";
import { BsFillPrinterFill, BsX } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";

const UpdateCode = ({ text, setOpenBarcode }) => {
  const componentRef = useRef();
  //   const handlePrint = useReactToPrint({
  //     content: () => componentRef.current,
  //     pageStyle: () => "width",
  //   });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // styling
    pageStyle: () => `
      @update_code_card {
        size: auto;
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

  return (
    <div className="update_code_page">
      <div className="container">
        <div className="update_code_container">
          <div className="update_code_print">
            <button onClick={() => setOpenBarcode(false)}>
              <BsX />
            </button>
            <button className="printer" onClick={handlePrint}>
              <BsFillPrinterFill />
            </button>
          </div>
          <div ref={componentRef} className="update_code_card">
            <Barcode value={text} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCode;
