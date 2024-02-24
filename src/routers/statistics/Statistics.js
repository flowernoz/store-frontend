import React, { useEffect, useState } from "react";
import { useGetreportsQuery } from "../../redux/rePortApi";
import "./Statistics.css";

const Statistics = () => {
  const { data } = useGetreportsQuery();
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    setAmount(data?.innerData[0]);
  }, [data]);

  // Raqamlarni formatlash uchun funksiya
  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  return (
    <div className="statistics_page">
      <div className="statistics_container">
        <div className="box shadow">
          <div className="statistics_card">
            {/* Raqamlarni formatlangan holda ko'rsatish */}
            <span>USZ</span>
            <p>
              {amount?.dailyTotal ? formatNumber(amount.dailyTotal) : "000"}
            </p>
            <span>Kunlik</span>
          </div>
        </div>
        <div className="box shadow">
          <div className="statistics_card">
            <span>USZ</span>
            <p>
              {amount?.lastCredit ? formatNumber(amount.lastCredit) : "000"}
            </p>
            <span>Nasiya</span>
          </div>
        </div>
        <div className="box shadow">
          <div className="statistics_card">
            <span>USZ</span>
            <p>
              {amount?.monthlyTotal ? formatNumber(amount.monthlyTotal) : "000"}
            </p>
            <span>Oylik</span>
          </div>
        </div>
        <div className="box shadow">
          <div className="statistics_card">
            <span>USZ</span>
            <p>
              {amount?.yearlyTotal ? formatNumber(amount.yearlyTotal) : "000"}
            </p>
            <span>Yillik</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
