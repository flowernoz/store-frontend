import "./popular.css";
import { useState, useEffect, memo } from "react";
import { FaMinus } from "react-icons/fa";
import { useGetPopularProductsQuery } from "../../redux/productApi";
import Empty from "../../components/empty/Empty";

function Allproducts() {
  const { data } = useGetPopularProductsQuery();
  const [dataItem, setDataItem] = useState([]);
  useEffect(() => {
    setDataItem(data?.innerData);
  }, [data]);

  return (
    // <div className="allproducts">
    //   {dataItem?.length ? (
    //     <>
    //       <h1 className="heading">Ommabop mahsulotlar</h1>
    //       <div className="tb">
    //         <table className="fl-table">
    //           <thead>
    //             <tr>
    //               <th>#</th>
    //               <th>Nomi</th>
    //               <th>Asl narxi</th>
    //               <th>Sotuv narxi</th>
    //               <th>Sotilgan Soni</th>
    //               <th>Kategoriya</th>
    //               <th>Subkategoriya</th>
    //               <th>O'lchami</th>
    //               <th>Brendi</th>
    //               <th>rangi</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {dataItem?.map((i, inx) => (
    //               <tr key={inx}>
    //                 <td>{inx + 1}</td>
    //                 <td>{i?.title}</td>
    //                 <td>{i?.orgPrice}</td>
    //                 <td>{i?.price}</td>
    //                 <td>{i?.quantity}</td>
    //                 <td>{i?.category}</td>
    //                 <td>{i?.subcategory ? i.subcategory : <FaMinus />}</td>
    //                 <td>{i?.size ? i.size : <FaMinus />}</td>
    //                 <td>{i?.brand ? i.brand : <FaMinus />}</td>
    //                 <td>{i?.color ? i.color : <FaMinus />}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </>
    //   ) : (
    //     <div className="empty">
    //       <Empty />
    //     </div>
    //   )}
    // </div>
    <div className="allproducts_page">
      {dataItem?.length ? (
        <div className="allproducts_container">
          <div className="allproducts_header">
            <h1>Ommabop mahsulotlar</h1>
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
