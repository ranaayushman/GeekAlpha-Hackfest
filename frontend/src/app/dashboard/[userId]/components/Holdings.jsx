'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_API_INVESTMENTS_URL;
const Holdings = ({ userId }) => {
  const [holdings, setHoldings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const token = Cookies.get('authToken'); // 👈 fetch token from cookies
        if (!token) {
          console.error('No auth token found in cookies');
          return;
        }

        const response = await axios.get(`${baseURL}/${userId}/holdings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHoldings(response.data.data);
      } catch (err) {
        console.error('Error fetching holdings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchHoldings();
  }, [userId]);

  if (loading) return <div className="p-4">Loading holdings...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Holdings Overview</h2>
      {Object.entries(holdings).map(([platform, details]) => (
        <div key={platform} className="mb-6 p-4 rounded-lg shadow-md bg-gray-100">
          <h3 className="text-xl font-semibold text-blue-600">{platform}</h3>
          <p className="text-gray-700 mb-2">Total Value: ₹{details.total}</p>
          <ul className="list-disc list-inside text-gray-800">
            {details.assets.map((asset, index) => (
              <li key={index}>{asset}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Holdings;
