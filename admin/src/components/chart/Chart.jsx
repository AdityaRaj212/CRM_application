import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./chart.scss";

const data = [
  {
    name: "Mon",
    Responses   : 4000,
    Hired: 2400,
    amt: 2400,
  },
  {
    name: "Thu",
    Responses : 3000,
    Hired: 1398,
    amt: 2210,
  },
  {
    name: "Wed",
    Responses : 2000,
    Hired: 9800,
    amt: 2290,
  },
  {
    name: "Thu",
    Responses : 2780,
    Hired: 3908,
    amt: 2000,
  },
  {
    name: "Fri",
    Responses : 1890,
    Hired: 4800,
    amt: 2181,
  },
  {
    name: "Sat",
    Responses : 2390,
    Hired: 3800,
    amt: 2500,
  },
  {
    name: "Sun",
    Responses : 3490,
    Hired: 4300,
    amt: 2100,
  },
];
const Chart = ({ aspect, revenue }) => {
   
  return (
    <div className="chart">
      <div className="title"> Candidate statistics  </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={730}
          height={250}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="gray"
            className="chatGrid"
          />
          <XAxis dataKey="name" />

          <Tooltip />
          <Legend />
          <Bar dataKey="Responses" fill="#8884d8" />
          <Bar dataKey="Hired" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;