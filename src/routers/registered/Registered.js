import React, { memo, useEffect, useState } from "react";
import "./Registered.css";
import {
  useGetAllUserQuery,
  useUserDeleteOneMutation,
  useUserSearchMutation,
} from "../../redux/userApi";
import Empty from "../../components/empty/Empty";
import { FaTrash } from "react-icons/fa";
import { Zoom, toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { MdOutlineUpdate } from "react-icons/md";

const Registered = () => {
  const { data, isLoading } = useGetAllUserQuery();
  const [userDeleteOne] = useUserDeleteOneMutation();
  const [userSearch] = useUserSearchMutation();
  const [dataItem, setDataItem] = useState([]);

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

  const userFirsNameSearch = async (search) => {
    try {
      let e = search.trimStart();
      const res = await userSearch({ search: e });
      if (res?.data?.status === "success") {
        setDataItem(res?.data?.innerData || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    findAges(data?.innerData);
  }, [data]);

  return (
    <div className="registered_page">
      {isLoading ? (
        <Loader />
      ) : dataItem?.length ? (
        <div className="registered_container">
          <div className="registered_header">
            <h1>Ro'yxatdagi adminlar</h1>
            <div className="search_container">
              <input
                onChange={(e) => userFirsNameSearch(e.target.value)}
                type="text"
                name="firstname"
                placeholder="Qidirish..."
              />
             
            </div>
          </div>
          <div className="registered_table_container">
            <table className="table">
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
                  <th>
                    <MdOutlineUpdate />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataItem?.map((item, inx) => (
                  <tr key={inx}>
                    <td data_lable="#">{inx + 1}</td>
                    <td data_lable="Ism">{item?.firstname}</td>
                    <td data_lable="Familiya">{item?.lastname}</td>
                    <td data_lable="Yil">{item?.year}</td>
                    <td data_lable="Yosh">{findAges(data?.innerData)[inx]}</td>
                    <td data_lable="Jins">{item?.gender}</td>
                    <td data_lable="Foydalanuvchi nomi">{item?.username}</td>
                    <td data_lable="Nomer">{item?.phone}</td>
                    <td data_lable="Manzil">{item?.address}</td>
                    <td data_lable="Roli">{item?.role}</td>
                    <td data_lable="O'zgartirish">
                      <FaTrash onClick={() => userDelete(item?._id)} />
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

export default memo(Registered);
