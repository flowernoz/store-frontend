import React, { useEffect, useState } from "react";
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
} from "../../redux/criditApi";
import { toast, ToastContainer, Zoom } from "react-toastify";
import CriditEye from "../../components/criditEye/CriditEye";
import Empty from "../../components/empty/Empty";

function AllCreditUsers() {
  const { data } = useGetAllCriditDataQuery();
  const [creditUserDeleteOne] = useCreditUserDeleteOneMutation();
  const [soldCriditFintUser] = useSoldCriditFintUserMutation();

  let [dataItem, setDataItem] = useState([]);
  const [openCriditEye, setOpenCriditEye] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setDataItem(data?.innerData);
  }, [data]);

  async function criditUserDeleteOne(id) {
    let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");
    clientConfirm &&
      (await creditUserDeleteOne(id)
        .then((res) => {
          console.log(res);
          if (res?.data?.status) {
            console.log(res);
            toast.success("malumot o'chirildi", {
              transition: Zoom,
              autoClose: 2000,
              closeButton: false,
              hideProgressBar: true,
            });
            return setDataItem(res?.data?.innerData);
          }
        })
        .catch((err) => console.log(err)));
  }

  const clickEye = async (id) => {
    await soldCriditFintUser({ id })
      .then((res) => {
        if (res?.data?.status === "success") {
          setUserData(res?.data?.innerData);
          setOpenCriditEye(!openCriditEye);
        }
      })
      .catch((err) => console.log(err));
  };

  openCriditEye
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="creditCart">
      {openCriditEye && (
        <CriditEye closeCreditEya={setOpenCriditEye} userData={userData} />
      )}
      {data?.innerData?.length ? (
        <>
          <h1 className="heading">Barcha qarzdorlar</h1>
          <div className="tb">
            <table className="fl-table">
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
                  <th>
                    <BsCart2 />
                  </th>
                  <th>
                    <LuClipboardEdit />
                  </th>
                  <th>
                    <IoTrashBinOutline />
                  </th>
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

                    <td></td>
                    <td>{i?.addedTime.split(" ")[0]}</td>
                    <td>{i?.givingDay}</td>
                    <td>
                      <FaRegEye onClick={() => clickEye(i?._id)} />
                    </td>
                    <td>
                      <FaPencilAlt />
                    </td>
                    <td>
                      <FaTrashCan onClick={() => criditUserDeleteOne(i?._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="empty">
          <Empty />
        </div>
      )}
    </div>
  );
}

export default AllCreditUsers;
