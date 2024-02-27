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
import Loader from "../../components/loader/Loader";
import { MdOutlineUpdate } from "react-icons/md";
function Allproducts() {
  const { data, isLoading } = useGetAllProductsQuery();
  const [productUpdate] = useProductUpdateMutation();
  const [deleteOneProduct] = useDeleteOneProductMutation();
  const [deleteAllProducts] = useDeleteAllProductsMutation();
  const [searchPost] = useSearchPostMutation();
  const [updateData, setUpdateData] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [openProEdit, setOpenProEdit] = useState(false);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [dataItem, setDataItem] = useState([]);

  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data?.innerData) {
      const sortedData = [...data.innerData].sort((a, b) => a.quantity - b.quantity);
      setDataItem(sortedData);
    }
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

  const proSearch = async (search) => {
    try {
      let e = search.trimStart();
      const res = await searchPost({ search: e });
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
      {isLoading ? (
        <Loader />
      ) : dataItem?.length ? (
        <div className="allproducts_container">
          <div className="allproducts_header">
            <h1>Barcha mahsulotlar</h1>
            <div className="search_container">
              <input
                onChange={(e) => proSearch(e.target.value)}
                type="text"
                name="firstname"
                placeholder="Qidirish..."
              />

            </div>
          </div>
          <div className="allproducts_table_container">
            <table className="table">
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
                  <th>
                    <MdOutlineUpdate />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataItem?.map((i, inx) => (
                  <tr key={inx}>
                    <td data_lable="#">{inx + 1}</td>
                    <td data_lable="Nomi">
                      {i?.title ? i?.title : <FaMinus />}
                    </td>
                    <td data_lable="Asl narxi">
                      {i?.orgPrice ? formatNumber(i?.orgPrice) : <FaMinus />}
                    </td>
                    <td data_lable="Sotuv narxi">
                      {i?.price ? formatNumber(i?.price) : <FaMinus />}
                    </td>
                    <td data_lable="Soni"
                      style={{
                        backgroundColor: i?.quantity <= 5 ? 'red' : 'inherit',
                        color: i?.quantity <= 5 ? 'white' : 'inherit'
                      }}
                      >
                      {i?.quantity ? formatNumber(i?.quantity) : <FaMinus />}
                    </td>
                    <td data_lable="Kategoriya">
                      {i?.category ? i?.category : <FaMinus />}
                    </td>
                    <td data_lable="Subkategoriya">
                      {i?.subcategory ? i.subcategory : <FaMinus />}
                    </td>
                    <td data_lable="O'lchami">
                      {i?.size ? i.size : <FaMinus />}
                    </td>
                    <td data_lable="Brendi">
                      {i?.brand ? i.brand : <FaMinus />}
                    </td>
                    <td data_lable="rangi">
                      {i?.color ? i.color : <FaMinus />}
                    </td>
                    <td data_lable="O'zgartirish">
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
