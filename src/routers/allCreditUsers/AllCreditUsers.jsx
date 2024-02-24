import React, { useEffect, useState, useContext } from "react";
import "./AllCreditUsers.css";
import {
  FaPencilAlt,
  FaRegCalendarPlus,
  FaRegCalendarCheck,
  FaRegEye,
} from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { FaTrashCan } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
// CREDIT API =>
import {
  useCreditUserDeleteOneMutation,
  useGetAllCriditDataQuery,
  useSoldCriditFintUserMutation,
  useUpdateCreditUserMutation,
} from "../../redux/criditApi";
import { toast, ToastContainer, Zoom } from "react-toastify";
import CriditEye from "../../components/criditEye/CriditEye";
import Empty from "../../components/empty/Empty";
import CreditEdit from "../../components/creditEdit/CreditEdit";

function AllCreditUsers() {
  let { role } = JSON.parse(sessionStorage.getItem("userInfo"));

  const { data } = useGetAllCriditDataQuery();
  const [creditUserDeleteOne] = useCreditUserDeleteOneMutation();
  const [soldCriditFintUser] = useSoldCriditFintUserMutation();
  const [updateCreditUser] = useUpdateCreditUserMutation();

  let [dataItem, setDataItem] = useState([]);
  const [openCriditEye, setOpenCriditEye] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openUserDataEdit, setOpenUserDataEdit] = useState(false);
  const [userUpdateData, setuserUpdateData] = useState(null);

  useEffect(() => {
    setDataItem(data?.innerData || []); // 1. '?.' operatori qo'shildi va yuqoridagi ifoda uchun yozilgan qo'shish
  }, [userUpdateData, data]);

  const clickEye = async (id) => {
    try {
      const res = await soldCriditFintUser({ id });
      if (res?.data?.msg === "Credit users are found") {
        setUserData(res?.data?.innerData || null); // `userData` obyektiga ma'lumot joylashtiriladi
        setOpenCriditEye(true); // Modal oynasini ochamiz
      }
    } catch (err) {
      console.error(err);
    }
  };

  const creditEdit = async (editData) => {
    try {
      const res = await updateCreditUser(editData);
      if (res?.data?.status === "success") {
        setOpenUserDataEdit(true);
        setuserUpdateData(res?.data?.innerData || null); // 3. Null tekshiruvi qo'shildi
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function criditUserDelete(id) {
    try {
      let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");
      if (clientConfirm) {
        const res = await creditUserDeleteOne(id);
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
  }

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  openCriditEye
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  openUserDataEdit
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="credit_cart_page">
      {openCriditEye && (
        <CriditEye closeCreditEya={setOpenCriditEye} userData={userData} />
      )}
      {openUserDataEdit && (
        <CreditEdit
          creditEditClose={setOpenUserDataEdit}
          updateUserData={userUpdateData}
          setDataItem={setDataItem}
        />
      )}
      {dataItem?.length ? (
        <div className="credit_cart_container">
          <div className="credit_cart_header">
            <h1>Barcha qarzdorlar</h1>
            <div className="search_container">
              <input type="text" name="firstname" placeholder="Qidirish..." />
              <select name="phone">
                <option>Nomer qidirish</option>
                <option value="909976220">909976220</option>
                <option value="909976220">909976220</option>
                <option value="909976220">909976220</option>
                <option value="909976220">909976220</option>
              </select>
            </div>
          </div>
          <div className="credit_cart_table_container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ismi</th>
                  <th>Familiyasi</th>
                  <th>Manzili</th>
                  <th>Telefon raqami</th>
                  <th>Passport raqami</th>
                  <th>
                    <GiMoneyStack />
                  </th>
                  <th>
                    <FaRegCalendarPlus />
                  </th>
                  <th>
                    <FaRegCalendarCheck />
                  </th>
                  <th>O'zgartirish</th>
                </tr>
              </thead>
              <tbody>
                {dataItem?.map((i, inx) => (
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>{i?.firstname}</td>
                    <td>{i?.lastname}</td>
                    <td>{i?.address}</td>
                    <td>{i?.phone}</td>
                    <td>{i?.passport}</td>
                    <td>{formatNumber(i?.creditTotalPrice)}</td>
                    <td>{i?.addedTime.split(" ")[0]}</td>
                    <td>{i?.givingDay}</td>
                    <td>
                      <FaRegEye onClick={() => clickEye(i?._id)} />

                      <FaPencilAlt onClick={() => creditEdit(i)} />
                      {role === "owner" ? (
                        <FaTrashCan onClick={() => criditUserDelete(i?._id)} />
                      ) : (
                        ""
                      )}
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
}

export default AllCreditUsers;
