import React from "react";
import "./CreditEdit.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useUpdateCreditUserMutation } from "../../redux/criditApi";

const CreditEdit = ({ creditEditClose }) => {
  const [updateCreditUser] = useUpdateCreditUserMutation();
  async function updateCredit(e) {
    e.preventDefault();

    let value = new FormData(e.target);
    let data = Object.fromEntries(value);
    data.price = +data.price;

    await updateCreditUser(data)
      .then((res) => console.log(res))
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
              <button className="form_btn">Ayrish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreditEdit;
