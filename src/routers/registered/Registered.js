import React, { memo, useEffect, useState } from "react";
import "./Registered.css";
import {
  useGetAllUserQuery,
  useUserDeleteOneMutation,
  useUserUpdateMutation,
} from "../../redux/userApi";
import Empty from "../../components/empty/Empty";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Zoom, toast } from "react-toastify";
import UserEdit from "../../components/userEdit/UserEdit";

const Registered = () => {
  const { data } = useGetAllUserQuery();
  const [userDeleteOne] = useUserDeleteOneMutation();
  const [dataItem, setDataItem] = useState([]);
  const [openUserEdit, setOpenUserEdit] = useState(false);

  useEffect(() => {
    setDataItem(data?.innerData || []);
  }, [data]);

  const findAges = (innerData) => {
    const ages = innerData?.map((item) => {
      return new Date().getFullYear() - item.year;
    });
    return ages;
  };

  async function userDelete(id) {
    try {
      let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");
      if (clientConfirm) {
        const res = await userDeleteOne(id);
        if (res?.data?.msg === "user is deleted") {
          setDataItem((prevData) => prevData.filter((item) => item._id !== id));
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

  const userEdit = (item) => {
    setOpenUserEdit(true);
  };

  useEffect(() => {
    findAges(data?.innerData);
  }, [data]);

  return (
    <div className="registered_page">
      {openUserEdit && <UserEdit close={setOpenUserEdit} />}
      {dataItem?.length ? (
        <table>
          <caption>Ro'yxatdagi adminlar</caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Ism</th>
              <th>Familiya</th>
              <th>Yil</th>
              <th>Yosh</th>
              <th>Jins</th>
              <th>Foydalanuvchi nomi</th>
              <th>Nomer</th>
              <th>Manzil</th>
              <th>Roli</th>
              <th>O'zgartirish</th>
            </tr>
          </thead>
          <tbody>
            {dataItem?.map((item, inx) => (
              <tr key={inx}>
                <td>{inx + 1}</td>
                <td>{item?.firstname}</td>
                <td>{item?.lastname}</td>
                <td>{item?.year}</td>
                <td>{findAges(data?.innerData)[inx]}</td>
                <td>{item?.gender}</td>
                <td>{item?.username}</td>
                <td>{item?.phone}</td>
                <td>{item?.address}</td>
                <td>{item?.role}</td>
                <td className="change">
                  <button onClick={() => userEdit(item)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => userDelete(item?._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty_cart">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default memo(Registered);
