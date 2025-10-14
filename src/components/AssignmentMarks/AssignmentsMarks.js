/**
 * AssignmentsMarks - Line chart with enhanced data, animations, and responsiveness.
 * @version 2.0.0
 */
import React from "react";
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

const AssignmentsMarks = () => {
  const data = [
    { name: "Week 1", marks: 4000, quiz: 2400, amt: 2400 },
    { name: "Week 2", marks: 3000, quiz: 1398, amt: 2210 },
    { name: "Week 3", marks: 2000, quiz: 9800, amt: 2290 },
    { name: "Week 4", marks: 2780, quiz: 3908, amt: 2000 },
    { name: "Week 5", marks: 1890, quiz: 4800, amt: 2181 },
    { name: "Week 6", marks: 2390, quiz: 3800, amt: 2500 },
    { name: "Week 7", marks: 3490, quiz: 4300, amt: 2100 },
    // Expanded data for better visualization
    { name: "Week 8", marks: 4200, quiz: 4500, amt: 2300 },
  ];

  return (
    <div className="card bg-base-100 shadow-xl mt-8 hover:shadow-2xl transition-all duration-300 animate-fade-in">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4 gradient-text">
          Assignment Marks Progress
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-base-300" />
            <XAxis dataKey="name" className="text-base-content" />
            <YAxis className="text-base-content" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="quiz"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              className="hover:stroke-primary transition-colors"
              dot={{ className: "fill-current hover:fill-primary" }}
            />
            <Line
              type="monotone"
              dataKey="marks"
              stroke="#82ca9d"
              className="hover:stroke-success transition-colors"
              dot={{ className: "fill-current hover:fill-success" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssignmentsMarks;
