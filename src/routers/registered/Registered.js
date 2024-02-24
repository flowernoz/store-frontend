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
import { MdOutlineUpdate } from "react-icons/md";

const Registered = () => {
  const { data } = useGetAllUserQuery();
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

  const aminAndOvnerSearch = async (search) => {
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
      {dataItem?.length ? (
        <div className="registered_container">
          <div className="registered_header">
            <h1>Ro'yxatdagi adminlar</h1>
            <div className="search_container">
              <input
                onChange={(e) => aminAndOvnerSearch(e.target.value)}
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
          <div className="registered_table_container">
            <table>
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
                    <td>
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
