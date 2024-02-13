import React, { useState } from "react";
import "./Nasiya.css";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// CRIDIT API => CREATE CRIDIT USER
import { useCreditCreateUserMutation } from "../../redux/criditApi";

function Nasiya() {
  const [creditCreateUser, { isLoading }] = useCreditCreateUserMutation();
  const [idNumber, setIdNumber] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regexPattern = /^[a-zA-Z]{2}\d{7}$/;
    if (regexPattern.test(value)) {
      setIdNumber(value);
    }
  };

  async function sendData(e) {
    e.preventDefault();
    let creditData = new FormData(e.target);
    let value = Object.fromEntries(creditData);
    value.phone = +value.phone;
    value.passport = idNumber;

    await creditCreateUser(value)
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          localStorage.setItem(
            "userCreditInfo",
            JSON.stringify(res?.data?.innerData)
          );
          toast.success("Malumotlar muofaqiyatli qo'shildi", {
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
          e.target.reset();
        }
      })
      .catch((res) => console.log(res));
  }

  return (
    <div className="nasiya">
      <div className="container">
        <ToastContainer position="top-center" />
        <div className="nasiya_cart">
          <form onSubmit={sendData}>
            <h1>Nasiya savdo</h1>
            <div className="form_inputs">
              <input required name="firstname" type="text" placeholder="Ismi" />
              <input
                required
                name="lastname"
                type="text"
                placeholder="Familiyasi"
              />
              <input
                required
                name="address"
                type="text"
                placeholder="Manzili"
              />
              <input
                required
                name="phone"
                type="number"
                placeholder="Telefon raqami"
              />
              <input
                required
                name="passport"
                type="text"
                placeholder="Passport raqami"
                onChange={(e) => handleInputChange(e)}
              />
              <input required type="date" name="givingDay" />
            </div>
            <button disabled={isLoading} type="submit">
              {isLoading ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Nasiya;
