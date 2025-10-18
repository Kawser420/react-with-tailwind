/**
 * AssignmentsMarks - Advanced line chart with real-time data simulation, export functionality,
 * enhanced animations (CSS3 + Framer Motion), zoom/pan, data filters, and accessibility.
 * Integrates Recharts with Tailwind/DaisyUI for world-class visualization. Added websocket placeholder.
 * @version 3.1.0
 * @author ReactTailwind Pro Team
 */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { saveAsCSV, saveAsImage } from "../../utils/exportUtils";

const AssignmentsMarks = () => {
  const [data, setData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'up', 'down'
  const [zoom, setZoom] = useState({ startIndex: 0, endIndex: 10 });

  // Expanded data with more weeks and realistic trends
  const baseData = useMemo(
    () => [
      { name: "Week 1", marks: 4200, quiz: 2500, amt: 2400, trend: "up" },
      { name: "Week 2", marks: 3100, quiz: 1500, amt: 2210, trend: "down" },
      { name: "Week 3", marks: 2200, quiz: 9900, amt: 2290, trend: "up" },
      { name: "Week 4", marks: 2900, quiz: 4100, amt: 2000, trend: "up" },
      { name: "Week 5", marks: 2000, quiz: 5000, amt: 2181, trend: "down" },
      { name: "Week 6", marks: 2600, quiz: 4000, amt: 2500, trend: "up" },
      { name: "Week 7", marks: 3700, quiz: 4500, amt: 2100, trend: "up" },
      { name: "Week 8", marks: 4400, quiz: 4700, amt: 2300, trend: "up" },
      { name: "Week 9", marks: 4000, quiz: 5400, amt: 2400, trend: "up" },
      { name: "Week 10", marks: 4700, quiz: 5000, amt: 2600, trend: "up" },
      { name: "Week 11", marks: 3800, quiz: 4600, amt: 2200, trend: "down" },
      { name: "Week 12", marks: 5100, quiz: 5800, amt: 2800, trend: "up" }, // Expanded to 12 weeks
    ],
    []
  );

  // Filtered data
  const filteredData = useMemo(() => {
    if (filter === "all") return baseData;
    return baseData.filter((item) => item.trend === filter);
  }, [filter, baseData]);

  useEffect(() => {
    // Set initial data
    setData(filteredData);

    // Simulate real-time updates every 4s with websocket placeholder
    const interval = setInterval(() => {
      setData((prev) => {
        if (prev.length === 0) return filteredData;
        return prev.map((item, idx) => ({
          ...item,
          marks: Math.max(0, item.marks + Math.floor(Math.random() * 300) - 150),
          quiz: Math.max(0, item.quiz + Math.floor(Math.random() * 400) - 200),
          trend: Math.random() > 0.5 ? "up" : "down",
        }));
      });
    }, 4000);

    // Websocket placeholder for prod
    // const ws = new WebSocket('ws://localhost:8080/marks');
    // ws.onmessage = (event) => setData(JSON.parse(event.data));

    setIsAnimating(true);
    return () => clearInterval(interval);
  }, [filteredData]);

  const handleExportCSV = useCallback(() => {
    const csv = [
      "Name,Marks,Quiz,Amount,Trend",
      ...data.map((row) => Object.values(row).join(","))
    ].join("\n");
    saveAsCSV("assignment-marks.csv", csv);
  }, [data]);

  const handleExportImage = useCallback(() => {
    const chartRef = document.querySelector(".recharts-wrapper");
    if (chartRef) saveAsImage(chartRef, "assignment-marks.png", { scale: 3 });
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, rotateX: 2 }}
      transition={{ duration: 0.7, ease: "easeOutCubic" }}
      className="card-premium mt-12 relative overflow-hidden z-10"
      role="figure"
      aria-label="Assignment Marks Progress Chart with Trends"
    >
      {/* Floating Particles Overlay */}
      <div className="particles-container absolute inset-0 opacity-20"></div>
      <div className="card-body relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="card-title text-3xl gradient-text">
            Assignment Marks Progress Tracker
          </h2>
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="select select-bordered select-sm"
              aria-label="Filter trends"
            >
              <option value="all">All Trends</option>
              <option value="up">Upward Trends</option>
              <option value="down">Downward Trends</option>
            </select>
            <motion.button
              onClick={handleExportCSV}
              className="btn btn-outline btn-sm"
              whileHover={{ scale: 1.1 }}
              aria-label="Export data to CSV"
            >
              📊 CSV
            </motion.button>
            <motion.button
              onClick={handleExportImage}
              className="btn btn-outline btn-sm"
              whileHover={{ scale: 1.1 }}
              aria-label="Export chart as image"
            >
              🖼️ PNG
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          <ResponsiveContainer key={filter} width="100%" height={400}>
            <LineChart
              data={data.slice(zoom.startIndex, zoom.endIndex)}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="4 4" className="stroke-base-300" />
              <XAxis
                dataKey="name"
                className="text-base-content font-medium"
                tick={{ fontSize: 13, fill: "#6b7280" }}
              />
              <YAxis className="text-base-content" tick={{ fontSize: 13, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.85)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                }}
                formatter={(value, name) => [
                  value,
                  name === "quiz" ? "Quiz Score" : name === "marks" ? "Assignment Marks" : "Amount",
                ]}
                labelStyle={{ fontWeight: "bold", color: "#3b82f6" }}
              />
              <Legend wrapperStyle={{ paddingTop: "15px" }} />
              <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" label="Baseline" />
              <Line
                type="monotone"
                dataKey="quiz"
                stroke="#8884d8"
                strokeWidth={4}
                activeDot={{ r: 10, strokeWidth: 3, stroke: "#fff" }}
                className="hover:stroke-primary transition-all duration-400"
                dot={{
                  className: "fill-primary hover:fill-accent stroke-white stroke-3",
                  r: 7,
                }}
                animationDuration={1200}
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="marks"
                stroke="#82ca9d"
                strokeWidth={4}
                className="hover:stroke-success transition-all duration-400"
                dot={{
                  className: "fill-success hover:fill-accent stroke-white stroke-3",
                  r: 7,
                }}
                animationDuration={1200}
              />
              <Brush
                dataKey="name"
                height={30}
                stroke="#8884d8"
                className="mt-4"
                onChange={({ startIndex, endIndex }) => setZoom({ startIndex, endIndex })}
              />
            </LineChart>
          </ResponsiveContainer>
        </AnimatePresence>
        {isAnimating && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-base-content/60 mt-4 flex items-center justify-center animate-pulse-gentle"
          >
            🔄 Simulating live updates via WebSocket (Demo Mode)...
          </motion.p>
        )}
        <p className="text-xs text-base-content/40 mt-2 text-center">
          Data points: {data.length} | Trends: {filter.toUpperCase()}
        </p>
      </div>
    </motion.div>
  );
};

AssignmentsMarks.propTypes = {
  // Self-contained component
};

export default React.memo(AssignmentsMarks);