import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import Charts from "./Charts";
import ThemeContext from "../Context/ThemeContext";
import StockContext from "../Context/StockContext";

import { fetchQuote, fetchDetails } from "../api/alpha-stock-api";

const Dashboard = () => {
  const [isStockDetailsLoading, setIsStockDetailsLoading] = useState(true);
  const [isQuoteLoading, setIsQuoteLoading] = useState(true);

  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol, setStockSymbol } = useContext(StockContext);
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});
  const localStockSymbol = localStorage.getItem("stockSymbol");

  useEffect(() => {
    const updateStocksDetails = async () => {
      try {
        setIsStockDetailsLoading(true);
        const symbol = localStockSymbol || stockSymbol;

        const result = await fetchDetails(symbol);
        console.log(result, "££££££££");
        setStockDetails(result);
        setStockSymbol(result.Symbol);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStocksOverview = async () => {
      try {
        setIsQuoteLoading(true);
        const symbol = localStockSymbol || stockSymbol;
        const result = await fetchQuote(symbol);
        console.log(result, "quoteeeeeeeee");
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };
    if (stockSymbol) {
      updateStocksDetails();
      updateStocksOverview();
    }
  }, [stockSymbol]);

  return (
    <div
      className={`h-screen grid grid-cols-1  gap-6 p-10 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      } `}
    >
      <div className="col-span-1  md:col-span-2 xl:col-span-3 ">
        <Header name={stockDetails.name} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="md:col-span-2 xl:col-span-2">
          <Charts stockSymbol={stockSymbol} />
        </div>

        <div className="md:col-span-1 xl:col-span-1">
          <Overview quote={quote} />
        </div>
        <div className="md:col-span-2 xl:row-span-1">
          <Details details={stockDetails} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
