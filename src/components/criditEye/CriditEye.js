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
            <div className="table_container">
              {userData?.stories?.map((story) => (
                <div className="table_container_border" key={story?._id}>
                  <p>
                    <strong>Olingan sanasi:</strong> {story?.boughtTime}
                  </p>
                  <p>
                    <strong>Umumiy narxi:</strong> {story?.totalPrice}
                  </p>
                  <table border="1">
                    <thead>
                      <tr>
                        <th>Nomi</th>
                        <th>Soni</th>
                        <th>
                          <GiMoneyStack />
                        </th>
                        <th>Umumiy narxi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {story?.products?.map((product) => (
                        <tr key={product?._id}>
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
              {/* {userData?.stories &&
                userData?.stories?.map((story) => (
                  <div className="table_container_border" key={story?._id}>
                    <p>
                      <strong>Olingan sanasi:</strong> {story?.boughtTime}
                    </p>
                    <p>
                      <strong>Umumiy narxi:</strong> {story?.totalPrice}
                    </p>
                    <table border="1">
                      <thead>
                        <tr>
                          <th>Nomi</th>
                          <th>Soni</th>
                          <th>
                            <GiMoneyStack />
                          </th>
                          <th>Umumiy narxi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {story?.products &&
                          story.products.map((product) => (
                            <tr key={product?._id}>
                              <td>{product?.title}</td>
                              <td>{product?.quantity}</td>
                              <td>{product?.price}</td>
                              <td>{product?.totalPrice}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriditEye;
