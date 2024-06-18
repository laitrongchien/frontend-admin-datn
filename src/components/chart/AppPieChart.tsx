import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const renderCustomLabel = ({ percent }: { percent: number }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

const AppPieChart = ({ data }: { data: any }) => {
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          nameKey="label"
          dataKey="value"
          innerRadius={64}
          outerRadius={100}
          cx="40%"
          cy="50%"
          paddingAngle={3}
          label={renderCustomLabel}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="middle"
          align="center"
          layout="vertical"
          iconSize={15}
          iconType="circle"
          wrapperStyle={{ marginLeft: "144px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AppPieChart;
