import React from "react";
import "./Nasiya.css";
import axios from "../../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nasiya() {
  function sendData(e) {
    e.preventDefault();
    let creditData = new FormData(e.target);
    let value = Object.fromEntries(creditData);

    axios
      .post("/creditUser/create", value)
      .then((res) => {
        localStorage.setItem(
          "userCreditInfo",
          JSON.stringify(res.data.innerData)
        );
        toast.success("successfuly saved", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
        });
        window.location.reload();
      })
      .catch((res) => console.log(res));
    localStorage.setItem("userCreditInfo", JSON.stringify(creditData));
  }
  return (
    <div className="nasiya">
      <div className="container">
        <ToastContainer />
        <div className="nasiya_cart">
          <form onSubmit={sendData}>
            <h1>Nasiya savdo</h1>
            <div className="hrr"></div>
            <input name="firstname" type="text" placeholder="Firstname" />
            <input name="lastname" type="text" placeholder="Lastname" />
            <input name="address" type="text" placeholder="Address" />
            <input name="phone" type="text" placeholder="Phone number" />
            <input name="passport" type="text" placeholder="Passport number" />
            <button type="submit">Saqlash</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Nasiya;
