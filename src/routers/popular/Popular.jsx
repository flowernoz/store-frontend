import "./popular.css";
import { useState, useEffect, memo } from "react";
import { FaMinus } from "react-icons/fa";
import { useGetPopularProductsQuery } from "../../redux/productApi";
import Empty from "../../components/empty/Empty";
import Loader from "../../components/loader/Loader";
function Allproducts() {
  const { data, isLoading } = useGetPopularProductsQuery();
  const [dataItem, setDataItem] = useState([]);
  useEffect(() => {
    setDataItem(data?.innerData);
  }, [data]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  return (
    <div className="popular_page">
      {isLoading ? (
        <Loader />
      ) : dataItem?.length ? (
        <div className="popular_container">
          <div className="popular_header">
            <h1>Ommabop mahsulotlar</h1>
            {/* <div className="search_container">
              <input type="text" name="firstname" placeholder="Qidirish..." />
              <select name="phone">
                <option>Kategoriya qidirish</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
                <option value="Smartfonlar">Smartfonlar</option>
              </select>
            </div> */}
          </div>
          <div className="popular_table_container">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nomi</th>
                  <th>Asl narxi</th>
                  <th>Sotuv narxi</th>
                  <th>Sotilgan Soni</th>
                  <th>Kategoriya</th>
                  <th>Subkategoriya</th>
                  <th>O'lchami</th>
                  <th>Brendi</th>
                  <th>rangi</th>
                </tr>
              </thead>
              <tbody>
                {dataItem?.map((i, inx) => (
                  <tr key={inx}>
                    <td data_lable="#">{inx + 1}</td>
                    <td data_lable="Nomi">{i?.title}</td>
                    <td data_lable="Asl narxi">{formatNumber(i?.orgPrice)}</td>
                    <td data_lable="Sotuv narxi">{formatNumber(i?.price)}</td>
                    <td data_lable="Sotilgan Soni">{i?.quantity}</td>
                    <td data_lable="Kategoriya">{i?.category}</td>
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
