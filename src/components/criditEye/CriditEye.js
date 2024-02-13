import React from "react";
import "./CriditEye.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";

const CriditEye = ({ closeCreditEya, userData }) => {
  return (
    <div className="eye_page">
      <div className="container">
        <div className="eye_container">
          <div className="eye_border">
            <div className="eye_header">
              <h2>Tarix</h2>
              <IoIosCloseCircleOutline onClick={() => closeCreditEya(false)} />
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nomi</th>
                  <th>Sana</th>
                  <th>Vaqti</th>
                  <th>Soni</th>
                  <th>
                    <GiMoneyStack />
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData?.stories?.map((i, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {i?.products?.map((item, inx) => (
                      <td key={inx}>{item?.title}</td>
                    ))}
                    <td>{i?.boughtTime.split(" ")[0]}</td>
                    <td>{i?.boughtTime.split(" ")[1]}</td>
                    {i?.products?.map((item, inx) => (
                      <td key={inx}>{item?.quantity}</td>
                    ))}
                    {i?.products?.map((item, inx) => (
                      <td key={inx}>{item?.price + " ming so'm"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriditEye;
