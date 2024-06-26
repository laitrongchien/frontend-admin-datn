import { formatDate } from "@/utils/common";
import React, { useState } from "react";
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

const generateLastNDays = (n: number) => {
  return [...Array(n)]
    .map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return formatDate(d);
    })
    .reverse();
};

const countNumberOrders = (
  data: any[],
  lastNDays: string[]
): Record<string, number> => {
  const counts: Record<string, number> = {};
  lastNDays.forEach((day: string) => {
    counts[day] = 0;
  });

  data.forEach((item) => {
    const day = formatDate(new Date(item.createdAt));
    if (counts[day] !== undefined) {
      counts[day]++;
    }
  });

  return counts;
};

const AppLineChart = ({
  bookingData,
  rentalData,
}: {
  bookingData: any;
  rentalData: any;
}) => {
  const [days, setDays] = useState(7);
  const lastNDays = generateLastNDays(days);

  const bookingTourCounts = countNumberOrders(bookingData, lastNDays);
  const rentalCounts = countNumberOrders(rentalData, lastNDays);

  const data = lastNDays.map((day) => ({
    label: day,
    totalBookingTours: bookingTourCounts[day] || 0,
    totalMotorRentals: rentalCounts[day] || 0,
  }));

  return (
    <>
      <div className="px-[26px] flex-between mb-2">
        <span className="text-[18px] text-gray-600 font-semibold ml-12">
          Thống kê đơn theo ngày
        </span>
        <div className="flex items-center gap-2 px-2 py-[6px] border rounded-lg">
          <button
            onClick={() => setDays(7)}
            className={`px-2 py-1 rounded-lg ${
              days === 7 && "bg-primary text-white"
            }`}
          >
            7 ngày trước
          </button>
          <button
            onClick={() => setDays(30)}
            className={`px-2 py-1 rounded-lg ${
              days === 30 && "bg-primary text-white"
            }`}
          >
            30 ngày trước
          </button>
          <button
            onClick={() => setDays(90)}
            className={`px-2 py-1 rounded-lg ${
              days === 90 && "bg-primary text-white"
            }`}
          >
            90 ngày trước
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalBookingTours"
            stroke="#8884d8"
            strokeWidth={2}
            name="Đơn đặt tour"
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="totalMotorRentals"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Đơn thuê xe"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default AppLineChart;
