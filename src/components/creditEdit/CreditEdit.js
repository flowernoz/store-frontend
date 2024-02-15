import React from "react";
import "./CreditEdit.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useUpdateCreditUserMutation } from "../../redux/criditApi";
import { toast, ToastContainer } from "react-toastify";

const CreditEdit = ({ creditEditClose, updateUserData, setDataItem }) => {
  const [updateCreditUser, { isLoading, isSuccess }] =
    useUpdateCreditUserMutation();

  let { creditTotalPrice } = updateUserData;

  async function updateCredit(e) {
    e.preventDefault();

    let value = new FormData(e.target);
    let data = Object.fromEntries(value);
    data.price = +data.price;

    let newCreditTotalPrice = creditTotalPrice - data?.price;

    await updateCreditUser({ _id: updateUserData?._id, newCreditTotalPrice })
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success("Muvaffaqiyatli o'zgartirish kiritildi", {
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
          creditEditClose(false);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="credit_edit">
      <div className="container">
        <div className="credit_edit_container">
          <form onSubmit={updateCredit}>
            <div className="form_header">
              <h2>Nasiyani o'zgartirish</h2>
              <IoIosCloseCircleOutline onClick={() => creditEditClose(false)} />
            </div>

            <div className="form_container">
              <input type="number" name="price" placeholder="Qarzdan ayrish" />
              <button disabled={isLoading} className="form_btn">
                {isLoading ? "Bajarilmoqda" : "Ayrish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreditEdit;
