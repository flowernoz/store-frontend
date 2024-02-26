import React, { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";

import "./AllCreditUsers.css";
import {
  FaPencilAlt,
  FaRegCalendarPlus,
  FaRegCalendarCheck,
  FaRegEye,
} from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { FaPassport } from "react-icons/fa6";

// CREDIT API =>
import {
  useCreditUserDeleteOneMutation,
  useGetAllCriditDataQuery,
  useSoldCriditFintUserMutation,
  useUpdateCreditUserMutation,
  useCreditUserSearchMutation,
} from "../../redux/criditApi";
import { toast, Zoom } from "react-toastify";
import CriditEye from "../../components/criditEye/CriditEye";
import Empty from "../../components/empty/Empty";
import CreditEdit from "../../components/creditEdit/CreditEdit";
import { MdOutlineUpdate } from "react-icons/md";

function AllCreditUsers() {
  let { role } = JSON.parse(sessionStorage.getItem("userInfo"));

  const { data, isLoading } = useGetAllCriditDataQuery();
  const [creditUserDeleteOne] = useCreditUserDeleteOneMutation();
  const [soldCriditFintUser] = useSoldCriditFintUserMutation();
  const [updateCreditUser] = useUpdateCreditUserMutation();
  const [creditUserSearch] = useCreditUserSearchMutation();

  let [dataItem, setDataItem] = useState([]);
  const [openCriditEye, setOpenCriditEye] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openUserDataEdit, setOpenUserDataEdit] = useState(false);
  const [userUpdateData, setuserUpdateData] = useState(null);

  useEffect(() => {
    setDataItem(data?.innerData.filter(item => item.creditTotalPrice > 0) || []); 
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

  const creditSearch = async (search) => {
    try {
      let e = search.trimStart();
      const res = await creditUserSearch({ search: e });
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
      {isLoading ? (
        <Loader />
      ) : dataItem?.length ? (
        <div className="credit_cart_container">
          <div className="credit_cart_header">
            <h1>Barcha qarzdorlar</h1>
            <div className="search_container">
              <input
                onChange={(e) => creditSearch(e.target.value)}
                type="text"
                name="firstname"
                placeholder="Qidirish..."
              />
          
            </div>
          </div>
          <div className="credit_cart_table_container">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ism</th>
                  <th>Familiya</th>
                  <th>Manzil</th>
                  <th>Telefon raqam</th>
                  <th>
                    <FaPassport />
                  </th>
                  <th>
                    <GiMoneyStack />
                  </th>
                  <th>
                    <FaRegCalendarPlus />
                  </th>
                  <th>
                    <FaRegCalendarCheck />
                  </th>
                  <th>
                    <MdOutlineUpdate />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataItem?.map((i, inx) => (
                  <tr key={inx}>
                    <td data_lable="#">{inx + 1}</td>
                    <td data_lable="Ism">{i?.firstname}</td>
                    <td data_lable="Familiya">{i?.lastname}</td>
                    <td data_lable="Manzil">{i?.address}</td>
                    <td data_lable="Telefon raqam">{i?.phone}</td>
                    <td data_lable="Pasport raqam">{i?.passport}</td>
                    <td data_lable="Qarz">
                      {formatNumber(i?.creditTotalPrice)}
                    </td>
                    <td data_lable="Ogan kun">{i?.addedTime.split(" ")[0]}</td>
                    <td data_lable="Baradigan kun">{i?.givingDay}</td>
                    <td data_lable="O'zgartirish">
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
