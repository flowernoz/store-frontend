import "./allProducts.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api";
import Loader from "../../../components/loader/Loader";
function Allproducts() {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/pro/allProducts")
      .then((res) => setData(res.data.innerData))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  let { id } = useParams();
  return (
    <div className="allproducts">
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <table className="fl-table">
            <caption>Barcha mahsulotlar</caption>
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
              </tr>
            </thead>
            <tbody>
              {data.map((i, inx) => (
                <tr key={inx}>
                  <td>{inx + 1}</td>
                  <td>{i?.title}</td>
                  <td>{i?.orgPrice}</td>
                  <td>{i?.price}</td>
                  <td>{i?.quantity}</td>
                  <td>{i?.category}</td>
                  <td>{i?.subcategory}</td>
                  <td>{i?.size}</td>
                  <td>{i?.brand}</td>
                  <td>{i?.color}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Allproducts;
