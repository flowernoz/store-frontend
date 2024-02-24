import "./allProducts.css";
import { useState, useEffect, memo } from "react";
import { FaTrash, FaEdit, FaMinus } from "react-icons/fa";
import ProEdit from "../../components/proEdit/ProEdit";
import {
  useGetAllProductsQuery,
  useProductUpdateMutation,
  useDeleteOneProductMutation,
  useSearchPostMutation,
  useDeleteAllProductsMutation,
} from "../../redux/productApi";
import { toast } from "react-toastify";
import Empty from "../../components/empty/Empty";
import UpdateCode from "../../components/updateCode/UpdateCode";
import { BsFillPrinterFill } from "react-icons/bs";

function Allproducts() {
  const { data } = useGetAllProductsQuery();
  const [productUpdate] = useProductUpdateMutation();
  const [deleteOneProduct] = useDeleteOneProductMutation();
  const [deleteAllProducts] = useDeleteAllProductsMutation();
  const [updateData, setUpdateData] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [openProEdit, setOpenProEdit] = useState(false);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    setDataItem(data?.innerData);
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
            toast.success("Malumot muofaqiyatli o'chirildi", {
              autoClose: 1500,
              closeButton: false,
              hideProgressBar: true,
            });
            setDataItem(res?.data?.innerData);
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

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  const codeRender = (code) => {
    setCategoryId(code);
    setOpenBarcode(true);
  };

  openProEdit
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="allproducts_page">
      {openBarcode && (
        <UpdateCode text={categoryId} setOpenBarcode={setOpenBarcode} />
      )}
      {openProEdit && <ProEdit data={updateData} close={setOpenProEdit} />}
      {dataItem?.length ? (
        <div className="allproducts_container">
          <div className="allproducts_header">
            <h1>Barcha mahsulotlar</h1>
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
          <div className="allproducts_table_container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nomi</th>
                  <th>Asl narxi</th>
                  <th>Sotuv narxi</th>
                  <th>Soni</th>
                  <th>Kategoriya</th>
                  <th>Subkategoriya</th>
                  <th>O'lchami</th>
                  <th>Brendi</th>
                  <th>rangi</th>
                  <th>o'zgartirish</th>
                </tr>
              </thead>
              <tbody>
                {dataItem?.map((i, inx) => (
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>{i?.title ? i?.title : <FaMinus />}</td>
                    <td>
                      {i?.orgPrice ? formatNumber(i?.orgPrice) : <FaMinus />}
                    </td>
                    <td>{i?.price ? formatNumber(i?.price) : <FaMinus />}</td>
                    <td>
                      {i?.quantity ? formatNumber(i?.quantity) : <FaMinus />}
                    </td>
                    <td>{i?.category ? i?.category : <FaMinus />}</td>
                    <td>{i?.subcategory ? i.subcategory : <FaMinus />}</td>
                    <td>{i?.size ? i.size : <FaMinus />}</td>
                    <td>{i?.brand ? i.brand : <FaMinus />}</td>
                    <td>{i?.color ? i.color : <FaMinus />}</td>
                    <td>
                      <FaEdit onClick={() => proEdit(i)} />

                      <FaTrash onClick={() => deleteOne(i?._id)} />

                      <BsFillPrinterFill
                        className="print_svg"
                        onClick={() => codeRender(i?.barcode)}
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
}

export default memo(Allproducts);
