import React from "react";
import "./Empty.css";
import empty from "../../assets/empty1.png";

const Empty = () => {
  return (
    <div className="empty_container">
      <img src={empty} alt="" />
    </div>
  );
};

export default Empty;
