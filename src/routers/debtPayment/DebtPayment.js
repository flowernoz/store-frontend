import React, { useEffect, useState } from "react";
import "./DebtPayment.css";
import {
  useGetCreditAmountUsersQuery,
  useChackUserDeleteOneMutation,
  useFindUserChackMutation,
} from "../../redux/creditAmountApi";
import { Zoom, toast } from "react-toastify";
import Empty from "../../components/empty/Empty";
import { FaMinus, FaTrash } from "react-icons/fa";
import { BsFillPrinterFill } from "react-icons/bs";
import UserPrint from "../../components/userPrint/UserPrint";

const DebtPayment = () => {
  const { data } = useGetCreditAmountUsersQuery();
  const [chackUserDeleteOne] = useChackUserDeleteOneMutation();
  const [findUserChack] = useFindUserChackMutation();
  const [dataItem, setDataItem] = useState([]);
  const [openPrint, setOpenPrint] = useState(false);
  const [userDataPrint, setUserDataPrint] = useState(null);

  let { role } = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    setDataItem(data?.innerData);
  }, [data]);

  const userChackDelete = async (id) => {
    try {
      let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");
      if (clientConfirm) {
        const res = await chackUserDeleteOne({ id });
        if (res?.data?.msg === "credit user is deleted") {
          setDataItem((prevData) => prevData.filter((item) => item._id !== id)); // 4. Bazadan o'chirilgan elementni o'chirish
          toast.success("malumot o'chirildi", {
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

  return (
    <div className="debt_payment_page">
      {openPrint && (
        <UserPrint setOpenPrint={setOpenPrint} userPrintData={userDataPrint} />
      )}
      {dataItem?.length ? (
        <div className="debt_payment_container">
          <div className="debt_payment_header">
            <h1>Qarz to'laganlar</h1>
            <div className="search_container">
              <input type="text" name="firstname" placeholder="Qidirish..." />
              <select name="phone">
                <option>Kategoriya qidirish</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
              </select>
            </div>
          </div>
          <div className="debt_paymet_table_container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ism</th>
                  <th>Familiya</th>
                  <th>Address</th>
                  <th>Nomer</th>
                  <th>Pasrtport raqami</th>
                  <th>Sanasi</th>
                  <th>Soati</th>
                  <th>Bergan pul</th>
                  <th>Opshi qarz</th>
                  <th>Qolgan qarz</th>
                  <th>O'zgartirish</th>
                </tr>
              </thead>

              <tbody>
                {dataItem?.map((item, inx) => (
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>{item?.usersStories?.firstname}</td>
                    <td>{item?.usersStories?.lastname}</td>
                    <td>{item?.usersStories?.address}</td>
                    <td>{item?.usersStories?.phone}</td>
                    <td>{item?.usersStories?.passport}</td>
                    <td>{item?.usersStories?.paymentDate.split(" ")[0]}</td>
                    <td>{item?.usersStories?.paymentDate.split(" ")[1]}</td>
                    <td>{item?.usersStories?.pricePaid}</td>
                    <td>{item?.usersStories?.remainingDebt}</td>
                    <td>{item?.usersStories?.totalPrice}</td>
                    <td>
                      {role === "owner" ? (
                        <FaTrash onClick={() => userChackDelete(item?._id)} />
                      ) : (
                        ""
                      )}
                      <BsFillPrinterFill
                        onClick={() => printChackRender(item?._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default DebtPayment;
