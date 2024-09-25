import React, { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";
import StockContext from "../Context/StockContext";

const SearchResults = ({ results }) => {
  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(StockContext);

  console.log(results, "YYYYYYYYY");

  return (
    <ul
      className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll  ${
        darkMode
          ? "bg-gray-900 custom-scrollbar custom-scrollbar-dark"
          : " bg-white border-neutral-200 "
      }`}
    >
      {results.map((item) => {
        return (
          <li
            key={item["1. symbol"]}
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${
              darkMode ? "hover:bg-indigo-600" : " hover:bg-indigo-200"
            } transition duration-300`}
            onClick={() => {
              setStockSymbol(item["1. symbol"]);
              localStorage.setItem("stockSymbol", item["1. symbol"]);
            }}
          >
            <span>{item["1. symbol"]}</span>
            <span>{item["2. name"]}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
