import "./allProducts.css";
import { useState, useEffect, memo } from "react";
import Loader from "../../components/btnLoader/BtnLoader";
import { FaTrash, FaEdit, FaMinus } from "react-icons/fa";
import ProEdit from "../../components/proEdit /ProEdit";
import {
  useGetAllProductsQuery,
  useProductUpdateMutation,
  useDeleteOneProductMutation,
  useSearchPostMutation,
  useDeleteAllProductsMutation,
} from "../../redux/productApi";
import empty from "../../assets/empty1.png";
import { toast } from "react-toastify";

function Allproducts() {
  const { data, error } = useGetAllProductsQuery();
  const [productUpdate] = useProductUpdateMutation();
  const [deleteOneProduct, { isSuccess }] = useDeleteOneProductMutation();
  const [searchPost] = useSearchPostMutation();
  const [deleteAllProducts] = useDeleteAllProductsMutation();
  const [updateData, setUpdateData] = useState("");
  const [openProEdit, setOpenProEdit] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDataItem(data?.innerData);
    setLoading(false);
  }, [data]);

  async function deleteAll() {
    let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");

    clientConfirm &&
      (await deleteAllProducts()
        .then((res) => setDataItem(res))
        .catch((err) => console.log(err)));
  }

  async function deleteOne(id) {
    let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");

    clientConfirm &&
      (await deleteOneProduct(id)
        .then((res) => {
          if (res?.data?.msg === "product is deleted") {
            isSuccess &&
              toast.success("Malumot muofaqiyatli o'chirildi", {
                autoClose: 1500,
                closeButton: false,
                hideProgressBar: true,
              });
            setDataItem(res);
          }
        })
        .catch((err) => console.log(err)));
  }

  async function proEdit(data) {
    await productUpdate(data)
      .then((res) => {
        if (res?.data?.status) {
          setUpdateData(res?.data?.innerData);
          setOpenProEdit(true);
        }
      })
      .catch((err) => console.log(err));
  }

  async function SearchValue(e) {
    let value = e.trimStart();

    await searchPost({ value })
      .then((res) => {
        if (res?.data?.status === "success") {
          setDataItem(res?.data?.innerData);
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
                    <td onClick={() => proEdit(i)}>
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