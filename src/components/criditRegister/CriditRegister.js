import React, { useState } from "react";
import "./CriditRegister.css";
import { Zoom, toast, ToastContainer } from "react-toastify";
import axios from "../../api";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useCreditFindRegisterMutation } from "../../redux/criditApi";

const CriditRegister = ({ close }) => {
  const [idNumber, setIdNumber] = useState("");
  const [register, setRegister] = useState(false);

  const [creditFindRegister, { isLoading, isSuccess }] =
    useCreditFindRegisterMutation();

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regexPattern = /^[a-zA-Z]{2}\d{7}$/;
    if (regexPattern.test(value)) {
      setIdNumber(value);
    }
  };

  function sendData(e) {
    e.preventDefault();
    let creditData = new FormData(e.target);
    let value = Object.fromEntries(creditData);
    value.phone = +value.phone;
    value.passport = idNumber;

    axios
      .post("/creditUser/create", value)
      .then((res) => {
        console.log(res);
        if (res?.data?.innerData) {
          localStorage.setItem(
            "userCreditInfo",
            JSON.stringify(res?.data?.innerData)
          );
          toast.success(res?.data?.innerData.status, {
            autoClose: 1500,
            hideProgressBar: true,
          });
          // return setTimeout(() => window.location.reload(), 2500);
        }
      })
      .catch((res) => console.log(res));
    localStorage.setItem("userCreditInfo", JSON.stringify(creditData));
  }

  //   criditFind

  const criditFind = async (e) => {
    e.preventDefault();

    let creditData = new FormData(e.target);
    let value = Object.fromEntries(creditData);

    await creditFindRegister(value)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="cridit_register_page">
      <div className="container">
        <ToastContainer />
        <div
          style={{
            width: register ? "350px" : "",
            margin: register ? "0 auto" : "",
          }}
          className="cridit_register_container"
        >
          <div className="cridit_register_form_container">
            <div className="cridit_register_form_header">
              <h2 onClick={() => setRegister(!register)}>
                {register ? "Nasiya registiratsiya" : "Register qidirish"}
              </h2>
              <IoIosCloseCircleOutline onClick={() => close(false)} />
            </div>
            {register ? (
              <div className="criedit_register_find_form">
                <form onSubmit={criditFind}>
                  <h1>Qidirish</h1>
                  <div className="form_find_inputs">
                    <input
                      name="passport"
                      maxLength={9}
                      required
                      type="text"
                      placeholder="Passport raqami"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <input
                      name="phone"
                      required
                      type="number"
                      placeholder="Telefon raqami"
                    />
                  </div>
                  <button>Qidirish</button>
                </form>
              </div>
            ) : (
              <div className="cridit_register_form">
                <form onSubmit={sendData}>
                  <h1>Nasiya savdo</h1>
                  <div className="form_inputs">
                    <input
                      required
                      name="firstname"
                      type="text"
                      placeholder="Ismi"
                    />
                    <input
                      name="lastname"
                      required
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
                      name="phone"
                      required
                      type="number"
                      placeholder="Telefon raqami"
                    />
                    <input
                      name="passport"
                      required
                      maxLength={9}
                      type="text"
                      placeholder="Passport raqami"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <input required type="date" name="data" />
                  </div>
                  <button type="submit">Saqlash</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriditRegister;
