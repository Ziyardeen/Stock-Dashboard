import React, { useContext, useState, useEffect } from "react";

import {
  fetchHourlyData,
  fetchDailyData,
  fetchHourlyDataFin,
  fetchHistoricData,
} from "../api/alpha-stock-api";
import StockContext from "../Context/StockContext";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "./Card";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../Context/ThemeContext";
import dayjs from "dayjs";

const Charts = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1D");

  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const localStockSymbol = localStorage.getItem("stockSymbol");

  const updateChartData = async (filter) => {
    const symbol = localStockSymbol || stockSymbol;
    try {
      if (filter === "1D") {
        const hourlyData = await fetchHourlyDataFin(symbol);
        setData(formatData(hourlyData));
      } else {
        const chartData = await fetchHistoricData(symbol, filter);
        console.log("Hello from ELSE");
        setData(formatData(chartData));
      }
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };
  useEffect(() => {
    updateChartData(filter);
  }, [filter, stockSymbol, localStockSymbol]);

  const formatData = (data) => {
    const extract = data.map((item) => {
      return {
        date: item.date,
        value: item.close,
      };
    });

    const sorted = extract.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    return sorted;
  };

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => setFilter(item)}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer>
        <AreaChart width={730} height={750} data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#321e81" : `rgba(199,210,254)`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#321e81" : `rgba(199,210,254)`}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <XAxis dataKey={"date"} />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Charts;
