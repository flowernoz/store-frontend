import React, { useEffect, useState } from "react";
import "./AllCreditUsers.css";
import axios from "../../api";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import BtnLoader from "../../components/btnLoader/BtnLoader";
import empty from "../../assets/empty.png";
function AllCreditUsers() {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get("/creditUser/creditUsers")
      .then((res) => setData(res.data.innerData))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className="creditCart">
      {loader ? (
        <BtnLoader />
      ) : data?.length ? (
        <>
          <h1 className="heading">Barcha qarzdorlar</h1>
          <div className="tb">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ismi</th>
                  <th>Familiyasi</th>
                  <th>Manzili</th>
                  <th>Telefon raqami</th>
                  <th>Passport raqami</th>
                  <th>Sotib olgan mahsulotlari</th>
                  <th>Umumiy summa</th>
                  <th>Tahrirlash</th>
                  <th>O'chirish</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, inx) => (
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>{i?.firstname}</td>
                    <td>{i?.lastname}</td>
                    <td>{i?.address}</td>
                    <td>{i?.phone}</td>
                    <td>{i?.passport}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <FaPencilAlt />
                    </td>
                    <td>
                      <FaTrashCan />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <img src={empty} alt="empty" className="empty" />
      )}
    </div>
  );
}

export default AllCreditUsers;
