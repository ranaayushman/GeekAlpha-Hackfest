"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Holdings from "./components/Holdings";
import PortfolioDetails from "./components/PortfolioDetails";
import Portfolio from "./components/Portfolio";
const Page = () => {
  const { userId } = useParams();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const INVST_API_URL = process.env.NEXT_PUBLIC_API_INVESTMENTS_URL;
  // Fetch investments when the component mounts or userId changes G
  useEffect(() => {
    const fetchInvestments = async () => {
      const token = Cookies.get("authToken"); // 👈 Grab token from cookies

      try {
        const response = await axios.get(`${INVST_API_URL}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = response.data;

        if (data.success) {
          setInvestments(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [userId]);

  if (loading) {
    return <div>Loading investments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Investments for User {userId}</h1>
      <Holdings userId={userId} />
      {/* <PortfolioDetails userId={userId} /> */}
      <Portfolio userId={userId} />
      {/* {investments.length === 0 ? (
        <p>No investments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Platform</th>
                <th className="border border-gray-300 p-2">Type</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Ticker</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Amount Invested</th>
                <th className="border border-gray-300 p-2">Current Value</th>
                <th className="border border-gray-300 p-2">Purchase Price</th>
                <th className="border border-gray-300 p-2">Live Price</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {investment.platform}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {investment.type}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {investment.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {investment.ticker || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {investment.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ₹{investment.amountInvested}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ₹{investment.currentValue}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {investment.purchasePrice
                      ? `₹${investment.purchasePrice}`
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {investment.livePrice ? `₹${investment.livePrice}` : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  );
};

export default Page;
