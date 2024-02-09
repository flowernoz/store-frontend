import "./allProducts.css";
import { useState, useEffect, memo } from "react";
import axios from "../../api";
import Loader from "../../components/btnLoader/BtnLoader";
import { FaTrash, FaEdit, FaMinus } from "react-icons/fa";
import ProEdit from "../../components/proEdit/ProEdit";
import {
  useGetAllProductsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../redux/productApi";
import empty from "../../assets/empty.png";
import { toast } from "react-toastify";

function Allproducts() {
  const { data, error } = useGetAllProductsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [updateData, setUpdateData] = useState("");
  const [openProEdit, setOpenProEdit] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDataItem(data?.innerData);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Ma'lumot topilmadi");
    }
  }, [error]);

  function deleteAll() {
    let warning = window.confirm("Bazani tozalashni xohlaysizmi?");
    if (warning) {
      axios.delete("/pro/deleteAllData");
    }
  }

  async function deleteOne(id) {
    await deletePost(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  async function proEdit(data) {
    await updatePost(data)
      .then((res) => {
        if (res?.data?.status) {
          setUpdateData(res?.data?.innerData);
          setOpenProEdit(true);
        }
      })
      .catch((err) => console.log(err));
  }

  openProEdit
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="allproducts">
      {openProEdit && <ProEdit data={updateData} close={setOpenProEdit} />}
      {loading ? (
        <Loader />
      ) : dataItem?.length ? (
        <>
          <h1 className="heading">Barcha mahsulotlar</h1>
          <div className="tb">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nomi</th>
                  <th>Asl narxi</th>
                  <th>Sotiladigan narxi</th>
                  <th>Soni</th>
                  <th>Kategoriyasi</th>
                  <th>Subkategoriyasi</th>
                  <th>O'lchami</th>
                  <th>Brendi</th>
                  <th>rangi</th>
                  <th>Tahrirlash</th>
                  <th onClick={deleteAll}>O'chirish</th>
                </tr>
              </thead>
              <tbody>
                {dataItem?.map((i, inx) => (
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>{i?.title}</td>
                    <td>{i?.orgPrice}</td>
                    <td>{i?.price}</td>
                    <td>{i?.quantity}</td>
                    <td>{i?.category}</td>
                    <td>{i?.subcategory ? i.subcategory : <FaMinus />}</td>
                    <td>{i?.size ? i.size : <FaMinus />}</td>
                    <td>{i?.brand ? i.brand : <FaMinus />}</td>
                    <td>{i?.color ? i.color : <FaMinus />}</td>
                    <td onClick={() => proEdit(i?._id)}>
                      <FaEdit />
                    </td>
                    <td onClick={() => deleteOne(i?._id)}>
                      <FaTrash />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="empty__cart">
          <img src={empty} alt="empty" className="empty" />
          Mahsulot topilmadi
        </div>
      )}
    </div>
  );
}

export default memo(Allproducts);
