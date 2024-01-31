import { useRef, useState } from "react";
import Webcam from "react-webcam";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./barCodeReader.css";

const QRScanner = ({ setOpenQrScanner }) => {
  const webcamRef = useRef(null);
  const [data, setData] = useState("");
  const [stopStream, setStopStream] = useState(false);
  console.log(data);
  const dismissQrReader = () => {
    setStopStream(true);
    setTimeout(() => setOpenQrScanner(false), 1000);
  };

  return (
    <div className="barCodeReader">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment",
        }}
      />
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("not found");
        }}
        onError={(err) => console.log(err)}
        stopStream={stopStream}
      />
      <p>{data}</p>
      <button onClick={dismissQrReader}>Cancel</button>
    </div>
  );
};

export default QRScanner;
