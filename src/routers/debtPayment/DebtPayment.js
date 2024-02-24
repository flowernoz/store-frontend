import React, { useEffect, useState } from "react";
import "./DebtPayment.css";
import {
  useGetCreditAmountUsersQuery,
  useChackUserDeleteOneMutation,
  useFindUserChackMutation,
  useUserChackSearchMutation,
} from "../../redux/creditAmountApi";
import { Zoom, toast } from "react-toastify";
import Empty from "../../components/empty/Empty";
import { FaTrash } from "react-icons/fa";
import { BiCalendarCheck } from "react-icons/bi";
import { MdOutlineUpdate } from "react-icons/md";
import { FaPassport } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { BsFillPrinterFill } from "react-icons/bs";
import UserPrint from "../../components/userPrint/UserPrint";

const DebtPayment = () => {
  const { data } = useGetCreditAmountUsersQuery();
  const [chackUserDeleteOne] = useChackUserDeleteOneMutation();
  const [findUserChack] = useFindUserChackMutation();
  const [userChackSearch] = useUserChackSearchMutation();
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

  const creditSearch = async (search) => {
    try {
      let e = search.trimStart();
      const res = await userChackSearch({ search: e });
      if (res?.data?.status === "success") {
        setDataItem(res?.data?.innerData || []);
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
      {dataItem?.length ? (
        <div className="debt_payment_container">
          <div className="debt_payment_header">
            <h1>Qarz to'laganlar</h1>
            <div className="search_container">
              <input
                onChange={(e) => creditSearch(e.target.value)}
                type="text"
                name="firstname"
                placeholder="Qidirish..."
              />
              <select name="phone">
                <option>Telfon raqami bo'yicha qidirish</option>
                <option value="909976220">909976220</option>
                <option value="909976220">909976220</option>
                <option value="909976220">909976220</option>
                <option value="909976220">909976220</option>
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
                  <th>
                    <FaPassport />
                  </th>
                  <th>
                    <BiCalendarCheck />
                  </th>
                  <th>
                    <LuClock />
                  </th>
                  <th>Bergan pul</th>
                  <th>Opshi qarz</th>
                  <th>Qolgan qarz</th>
                  <th>
                    <MdOutlineUpdate />
                  </th>
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
                    <td>{formatNumber(item?.usersStories?.pricePaid)}</td>
                    <td>{formatNumber(item?.usersStories?.remainingDebt)}</td>
                    <td>{formatNumber(item?.usersStories?.totalPrice)}</td>
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
