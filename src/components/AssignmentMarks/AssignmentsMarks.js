/**
 * AssignmentsMarks - Advanced line chart with real-time data simulation, export functionality,
 * enhanced animations (CSS3 + Framer Motion fallback), and accessibility features.
 * Integrates Recharts with Tailwind/DaisyUI for world-class visualization.
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion"; // Added for React-level animations
import PropTypes from "prop-types";
import { saveAsCSV } from "../../utils/exportUtils"; // New utility for vanilla JS export

const AssignmentsMarks = () => {
  const [data, setData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);

  // Expanded data with realistic progression and simulation
  const baseData = useMemo(
    () => [
      { name: "Week 1", marks: 4000, quiz: 2400, amt: 2400, trend: "up" },
      { name: "Week 2", marks: 3000, quiz: 1398, amt: 2210, trend: "down" },
      { name: "Week 3", marks: 2000, quiz: 9800, amt: 2290, trend: "up" },
      { name: "Week 4", marks: 2780, quiz: 3908, amt: 2000, trend: "up" },
      { name: "Week 5", marks: 1890, quiz: 4800, amt: 2181, trend: "down" },
      { name: "Week 6", marks: 2390, quiz: 3800, amt: 2500, trend: "up" },
      { name: "Week 7", marks: 3490, quiz: 4300, amt: 2100, trend: "up" },
      { name: "Week 8", marks: 4200, quiz: 4500, amt: 2300, trend: "up" },
      { name: "Week 9", marks: 3800, quiz: 5200, amt: 2400, trend: "up" }, // Expanded
      { name: "Week 10", marks: 4500, quiz: 4800, amt: 2600, trend: "up" }, // Expanded
    ],
    []
  );

  useEffect(() => {
    // Simulate real-time data updates every 5s for demo (vanilla JS interval)
    const interval = setInterval(() => {
      setData((prev) =>
        prev.length > 0
          ? prev.map((item, idx) => ({
              ...item,
              marks: item.marks + Math.floor(Math.random() * 200) - 100,
              quiz: item.quiz + Math.floor(Math.random() * 300) - 150,
            }))
          : baseData
      );
    }, 5000);
    setData(baseData);
    return () => clearInterval(interval);
  }, [baseData]);

  const handleExport = () => {
    // Vanilla JS CSV export
    const csv = data.map((row) => Object.values(row).join(",")).join("\n");
    saveAsCSV("assignment-marks.csv", csv);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card bg-base-100 shadow-xl mt-8 hover:shadow-2xl transition-all duration-500 ease-out-cubic animate-fade-in will-change-transform"
      role="figure"
      aria-label="Assignment Marks Progress Chart"
    >
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-2xl gradient-text">
            Assignment Marks Progress
          </h2>
          <button
            onClick={handleExport}
            className="btn btn-outline btn-sm hover:scale-110 transition-transform"
            aria-label="Export chart data to CSV"
          >
            📊 Export
          </button>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-base-300" />
            <XAxis
              dataKey="name"
              className="text-base-content font-medium"
              tick={{ fontSize: 12 }}
            />
            <YAxis className="text-base-content" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
                borderRadius: "8px",
              }}
              formatter={(value, name) => [
                value,
                name === "quiz" ? "Quiz Score" : "Marks",
              ]}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Line
              type="monotone"
              dataKey="quiz"
              stroke="#8884d8"
              strokeWidth={3}
              activeDot={{ r: 8, strokeWidth: 2 }}
              className="hover:stroke-primary transition-all duration-300"
              dot={{
                className:
                  "fill-primary hover:fill-accent stroke-white stroke-2",
                r: 6,
              }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="marks"
              stroke="#82ca9d"
              strokeWidth={3}
              className="hover:stroke-success transition-all duration-300"
              dot={{
                className:
                  "fill-success hover:fill-accent stroke-white stroke-2",
                r: 6,
              }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
        {isAnimating && (
          <p className="text-sm text-base-content/50 mt-2 animate-pulse">
            🔄 Simulating live updates...
          </p>
        )}
      </div>
    </motion.div>
  );
};

AssignmentsMarks.propTypes = {
  // No props, self-contained
};

export default React.memo(AssignmentsMarks); // Memoized for performance
