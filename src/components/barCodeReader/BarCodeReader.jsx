import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./barCodeReader.css";
import { useZxing } from "react-zxing";
const QRScanner = ({ setOpenQrScanner }) => {
  const webcamRef = useRef(null);
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });
  console.log(result);
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
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </div>
  );
};

export default QRScanner;
