/**
 * PhoneBar - Enhanced bar chart with loading, error handling, and animations.
 * Fetches from API, mocks prices for demo.
 * @version 2.0.0
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

const PhoneBar = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const { data } = await axios.get(
          "https://openapi.programming-hero.com/api/phones?search=iphone"
        );
        const phoneLoaded = data.data;
        const phoneData = phoneLoaded.slice(0, 6).map((phone) => {
          // Mock prices based on model (real API lacks prices)
          const model = phone.slug.split("-")[1] || "unknown";
          const mockPrice = Math.floor(Math.random() * 2000) + 500; // $500-$2500
          return {
            name: phone.phone_name,
            price: mockPrice,
            // Add second metric for dual bars
            rating: Math.floor(Math.random() * 5) + 1,
          };
        });
        setPhones(phoneData);
      } catch (err) {
        setError("Failed to load phone data. Showing mock data.");
        // Fallback mock data
        setPhones([
          { name: "iPhone 13", price: 799, rating: 4.5 },
          { name: "iPhone 14", price: 999, rating: 4.7 },
          { name: "iPhone 15", price: 1099, rating: 4.9 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loading loading-bars loading-lg animate-pulse-gentle"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4 gradient-text">
          Phone Price Comparison
        </h2>
        <ResponsiveContainer
          width="100%"
          height={400}
          className="animate-fade-in"
        >
          <BarChart data={phones}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-base-300" />
            <XAxis dataKey="name" className="text-base-content" />
            <YAxis className="text-base-content" />
            <Tooltip formatter={(value) => [`$${value}`, "Price"]} />
            <Legend />
            <Bar
              dataKey="price"
              fill="#8884d8"
              className="hover:fill-primary transition-colors"
            />
            <Bar
              dataKey="rating"
              fill="#82ca9d"
              className="hover:fill-success transition-colors"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

PhoneBar.propTypes = {};

export default PhoneBar;
