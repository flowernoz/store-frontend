import React, { useState } from "react";
import "./CriditRegister.css";
import {  toast, ToastContainer } from "react-toastify";
import { useCart } from "../../redux/selectors";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  useCreditCreateUserMutation,
  useCreditFindRegisterMutation,
} from "../../redux/criditApi";
import { ClearCart } from "../../redux/cart";
import { useDispatch } from "react-redux";

const CriditRegister = ({ close, totalPrice }) => {
  const cart = useCart();
  const dispatch = useDispatch();

  const [regLoader, setRegLoader] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [register, setRegister] = useState(false);

  const [creditFindRegister, { isLoading }] = useCreditFindRegisterMutation();
  const [creditCreateUser] = useCreditCreateUserMutation();

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
    setRegLoader(true);

    function toUpperCase(number) {
      var toUpperCase = number.replace(/[a-z]/g, function (i) {
        return i.toUpperCase();
      });
      return toUpperCase;
    }

    var input = value?.passport;
    var upperCase = toUpperCase(input);

    value.passport = upperCase;

    let userData = { criditUser: value, totalPrice, criditData: cart };

    await creditCreateUser(userData)
      .then((res) => {
        if (res?.data?.status === "success") {
          localStorage.setItem(
            "userCreditInfo",
            JSON.stringify(res?.data?.innerData)
          );
          setRegLoader(false);
          toast.success("Malumotlar muofaqiyatli qo'shildi", {
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
          dispatch(ClearCart());
          e.target.reset();
          close(false);
        }
      })
      .catch((res) => console.log(res));
  }

  //   criditFind

  async function criditFind(e) {
    e.preventDefault();

    let creditData = new FormData(e.target);
    let value = Object.fromEntries(creditData);

    function toUpperCase(number) {
      let toUpperCase = number.replace(/[a-z]/g, function (i) {
        return i.toUpperCase();
      });
      return toUpperCase;
    }

    let input = value?.passport;
    let upperCase = toUpperCase(input);

    value.passport = upperCase;

    let userData = { criditUser: value, totalPrice, criditData: cart };

    await creditFindRegister(userData)
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success("Malumotlar muofaqiyatli qo'shildi", {
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
          e.target.reset();
          dispatch(ClearCart());
          close(false);
        }
      })
      .catch((err) => {
        if (!err?.data?.status) {
          toast.warn(
            `Bazada bunaqa malumot topilmadi nomer:${err?.data?.msg?.phone} passport: ${err?.data?.msg?.passport}`,
            {
              autoClose: 2000,
              closeButton: false,
              hideProgressBar: true,
            }
          );
        }
      });
  }

  return (
    <div className="cridit_register_page">
      <div className="container">
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
                  <button disabled={isLoading}>
                    {isLoading ? "Qidirilmoqda..." : "Qidirish"}
                  </button>
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
                    <input required type="date" name="givingDay" />
                  </div>
                  <button disabled={regLoader} type="submit">
                    {regLoader ? "Saqlanmoqda" : "Saqlash"}
                  </button>
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
