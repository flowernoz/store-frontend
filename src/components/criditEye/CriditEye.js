import React from "react";
import "./CriditEye.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlinePriceCheck, MdOutlineTitle } from "react-icons/md";
import { GoNumber } from "react-icons/go";

const CriditEye = ({ closeCreditEya, userData }) => {
  return (
    <div className="eye_page">
      <div className="container">
        <div className="eya_card">
          <div className="cont_eya">
            <div className="eye_header">
              <h2>Tarix</h2>
              <IoIosCloseCircleOutline onClick={() => closeCreditEya(false)} />
            </div>
            {userData?.stories?.map((story, index) => (
              <div className="table_container_border" key={index}>
                <div className="eya_data_item">
                  <p>
                    <strong>Olingan sanasi:</strong>
                    {story?.boughtTime.split(", ")[0]}
                  </p>
                  <p>
                    <strong>Olingan vaqti:</strong>
                    {story?.boughtTime.split(" ")[1]}
                  </p>
                  <p>
                    <strong>Umumiy narxi:</strong> {story?.totalPrice}
                  </p>
                </div>
                <table border="1">
                  <thead>
                    <tr>
                      <th>
                        <MdOutlineTitle />
                      </th>
                      <th>
                        <GoNumber />
                      </th>
                      <th>
                        <GiMoneyStack />
                      </th>
                      <th>
                        <MdOutlinePriceCheck />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {story?.products?.map((product, idx) => (
                      <tr key={idx}>
                        <td>{product?.title}</td>
                        <td>{product?.quantity}</td>
                        <td>{product?.price}</td>
                        <td>{product?.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriditEye;
