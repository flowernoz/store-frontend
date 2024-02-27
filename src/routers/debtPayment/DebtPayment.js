import React, { useEffect, useState } from "react";
import "./DebtPayment.css";
import {
  useGetCreditAmountUsersQuery,
  useChackUserDeleteOneMutation,
  useFindUserChackMutation,
} from "../../redux/creditAmountApi";
import { Zoom, toast } from "react-toastify";
import Empty from "../../components/empty/Empty";
import { FaPassport, FaRegCalendarPlus, FaTrash } from "react-icons/fa";
import { CiClock2, CiLocationOn } from "react-icons/ci";
import { BsFillPrinterFill } from "react-icons/bs";
import UserPrint from "../../components/userPrint/UserPrint";
import Loader from "../../components/loader/Loader";
import { MdOutlinePhoneForwarded, MdOutlineUpdate } from "react-icons/md";
// Sanani va vaqtni formatlash uchun funksiya
function formatDateTime(dateString) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedDate = formatter.format(date).replace("", "");
  return formattedDate;
}

const DebtPayment = () => {
  const { data, isLoading } = useGetCreditAmountUsersQuery();
  const [chackUserDeleteOne] = useChackUserDeleteOneMutation();
  const [findUserChack] = useFindUserChackMutation();
  const [dataItem, setDataItem] = useState([]);
  const [openPrint, setOpenPrint] = useState(false);
  const [userDataPrint, setUserDataPrint] = useState(null);

  let { role } = JSON.parse(sessionStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    setDataItem(data?.innerData);
  }, [data]);

  const userChackDelete = async (id) => {
    try {
      let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz?");
      if (clientConfirm) {
        const res = await chackUserDeleteOne({ id });
        if (res?.data?.msg === "credit user is deleted") {
          setDataItem((prevData) => prevData.filter((item) => item._id !== id));
          toast.success("Malumot o'chirildi", {
            transition: Zoom,
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const printChackRender = async (id) => {
    try {
      const res = await findUserChack({ id });
      if (res?.data?.status === "success") {
        setOpenPrint(true);
        setUserDataPrint(res?.data?.innerData?.usersStories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  return (
    <div className="debt_payment_page">
      {openPrint && (
        <UserPrint setOpenPrint={setOpenPrint} userPrintData={userDataPrint} />
      )}
      {isLoading ? (
        <Loader />
      ) : dataItem?.length ? (
        <div className="debt_payment_container">
          <div className="debt_payment_header">
            <h1>Qarz to'laganlar</h1>
            <div className="search_container">
              <input type="text" name="firstname" placeholder="Qidirish..." />
              <select name="phone">
                <option>Kategoriya qidirish</option>
                <option value="Smartfonlar">Smartfonlar</option>
              </select>
            </div>
          </div>
          <div className="debt_paymet_table_container">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ism</th>
                  <th>Familiya</th>
                  <th>
                    <CiLocationOn />
                  </th>
                  <th>
                    <MdOutlinePhoneForwarded />
                  </th>
                  <th>
                    <FaPassport />
                  </th>
                  <th>
                    <FaRegCalendarPlus />
                  </th>
                  <th>
                    <CiClock2 />
                  </th>
                  <th>Bergan pul</th>
                  <th>Umumiy qarz</th>
                  <th>Qolgan qarz</th>
                  <th>
                    <MdOutlineUpdate />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataItem?.map((item, index) => {
                  const paymentDate = item?.usersStories?.paymentDate
                    ? formatDateTime(item?.usersStories?.paymentDate)
                    : "";
                  const [date, time] = paymentDate.split(", ");
                  return (
                    <tr key={index}>
                      <td data_lable="#">{index + 1}</td>
                      <td data_lable="Ism">{item?.usersStories?.firstname}</td>
                      <td data_lable="Familiya">
                        {item?.usersStories?.lastname}
                      </td>
                      <td data_lable="Manzil">{item?.usersStories?.address}</td>
                      <td data_lable="Nomer">{item?.usersStories?.phone}</td>
                      <td data_lable="Pasport nomer">
                        {item?.usersStories?.passport}
                      </td>
                      <td data_lable="Qarz bergan kun">{date}</td>
                      <td data_lable="Soat">{time}</td>
                      <td data_lable="Bergan pul">
                        {formatNumber(item?.usersStories?.pricePaid)}
                      </td>
                      <td data_lable="Umumiy qarz">
                        {formatNumber(item?.usersStories?.totalPrice)}

                      </td>
                      <td data_lable="Qolgan qarz">
                        {formatNumber(item?.usersStories?.remainingDebt)}

                      </td>
                      <td></td>
                      <td data_lable="O'zgartirish">
                        {role === "owner" && (
                          <FaTrash onClick={() => userChackDelete(item._id)} />
                        )}
                        <BsFillPrinterFill
                          onClick={() => printChackRender(item._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default DebtPayment;
