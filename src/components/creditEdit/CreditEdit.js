import React, { useState } from "react";
import "./CreditEdit.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useUpdateCreditUserMutation } from "../../redux/criditApi";
import { useCreateAmountCreditMutation } from "../../redux/creditAmountApi";
import { toast } from "react-toastify";
import UserPrint from "../userPrint/UserPrint";

const CreditEdit = ({ creditEditClose, updateUserData, setDataItem }) => {
  const [updateCreditUser, { isLoading, isSuccess }] =
    useUpdateCreditUserMutation();

  const [createAmountCredit] = useCreateAmountCreditMutation();

  let { creditTotalPrice } = updateUserData;

  // ------------------------------------------

  // input qiymatiga bosh string qoshish ochun
  const [price, setPrice] = useState("");
  const [openPrint, setOpenPrint] = useState(false);
  const [userDataPrint, setUserDataPrint] = useState(null);

  // toza qiymat olish uchun
  const [clenPriceValue, setClenPriceValue] = useState("");

  // input qiymatini orasiga bosh string qoshib beradigan funftion
  const formatNumber = (qiymat) => {
    return qiymat.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const priceChange = (e) => {
    const value = e.target.value;
    const orgValue = value.replace(/\D/g, "");
    const formatValue = formatNumber(value);

    setPrice(formatValue);
    setClenPriceValue(orgValue);
  };

  //  ----------------------------------------------

  async function updateCredit(e) {
    e.preventDefault();

    let value = new FormData(e.target);
    let data = Object.fromEntries(value);
    data.price = +clenPriceValue;

    let newCreditTotalPrice = creditTotalPrice - data?.price;

    await updateCreditUser({ _id: updateUserData?._id, newCreditTotalPrice })
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success("Muvaffaqiyatli o'zgartirish kiritildi", {
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
          setPrice("");
        }
      })
      .catch((err) => console.log(err));

    amoutnData(newCreditTotalPrice, data.price);
  }

  async function amoutnData(newCreditTotalPrice, pricePaid) {
    let userData = {
      updateUserData, //user malumotlari
      pricePaid, //bergan puli
      newCreditTotalPrice, //qarzidan ayrilgani
      creditTotalPrice, //oldingi qarzi
    };

    try {
      let res = await createAmountCredit(userData);
      // console.log(res);
      if (res?.data?.status === "success") {
        setOpenPrint(true);
        setUserDataPrint(res?.data?.innerData?.usersStories);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // openPrint ? creditEditClose(openPrint) : creditEditClose(openPrint);

  return (
    <div className="credit_edit">
      {openPrint && (
        <UserPrint setOpenPrint={setOpenPrint} userPrintData={userDataPrint} />
      )}
      <div className="container">
        <div className="credit_edit_container">
          <form onSubmit={updateCredit}>
            <div className="form_header">
              <h2>Nasiyani o'zgartirish</h2>
              <IoIosCloseCircleOutline onClick={() => creditEditClose(false)} />
            </div>

            <div className="form_container">
              <input
                type="text"
                value={price}
                onChange={priceChange}
                name="price"
                placeholder="Qarzdan ayrish"
              />
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
