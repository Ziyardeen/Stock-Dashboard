import axios from "axios";
import { filterStock } from "../helpers/date-helper";

const baseURL = "https://alpha-vantage.p.rapidapi.com";
const apiKey = process.env.REACT_APP_ALPHA_RAPID_1_API_KEY;
const apiKey1 = process.env.REACT_APP_ALPHA_RAPID_2_API_KEY;
const finModApi = process.env.REACT_APP_FINMOD_API_KEY;

export const searchSymbol = async (query) => {
  try {
    const response = await axios.get(`${baseURL}/query`, {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: query,
        datatype: "json",
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      },
    });

    const searchResults = response.data.bestMatches;

    return searchResults;
  } catch (error) {
    console.error("Error fetching symbol search data:", error);
    throw error;
  }
};

export const fetchStockDetails = async (stockSymbol) => {
  try {
    const response = await axios.get(`${baseURL}/query`, {
      params: {
        function: "OVERVIEW",
        symbol: stockSymbol,
        datatype: "json",
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      },
    });

    const stockDetails = response.data;

    return stockDetails;
  } catch (error) {
    console.error("Error fetching stock details", error);
    throw error;
  }
};

export const fetchDetails = async (stockSymbol) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=${finModApi}`
    );

    const data = response.data[0];

    return data;
  } catch (error) {
    console.error("Error fetching stock details", error);
    throw error;
  }
};

export const fetchQuote = async (stockSymbol) => {
  try {
    const response = await axios.get(`${baseURL}/query`, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: stockSymbol,
        datatype: "json",
      },
      headers: {
        "x-rapidapi-key": apiKey1,
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      },
    });

    const stockQuote = response.data;

    return stockQuote["Global Quote"];
  } catch (error) {
    console.error("Error fetching stock quote", error);
    throw error;
  }
};

export const fetchHourlyDataFin = async (stockSymbol) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-chart/1hour/${stockSymbol}?&apikey=${finModApi}`
    );

    const data = response.data.slice(0, 24);

    return data;
  } catch (error) {
    console.error("Error fetching hourly data from fin", error);
    throw error;
  }
};
export const fetchHistoricData = async (stockSymbol, filter) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${stockSymbol}?apikey=${finModApi}`
    );

    switch (filter) {
      case "1W":
        return response.data.historical.slice(0, 7);
      case "1M":
        return response.data.historical.slice(0, 30);
      case "1Y":
        return response.data.historical.slice(0, 365);
      default:
        throw new Error("An Error occurred in the chart filter");
    }
  } catch (error) {
    console.error("Error fetching historic data", error);
    throw error;
  }
};

export const fetchDailyData = async (stockSymbol, filter) => {
  try {
    const response = await axios.get(`${baseURL}/query`, {
      params: {
        datatype: "json",
        output_size: "compact",
        function: "TIME_SERIES_DAILY_ADJUSTED",
        symbol: stockSymbol,
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      },
    });

    const data = response.data["Time Series (Daily)"];

    const filtredData = filterStock(data, filter);

    return filtredData;
  } catch (error) {
    console.error("Error fetching daily data", error);
    throw error;
  }
};

export const fetchHourlyData = async (stockSymbol) => {
  try {
    const response = await axios.get(`${baseURL}/query`, {
      params: {
        datatype: "json",
        output_size: "compact",
        interval: "60min",
        function: "TIME_SERIES_INTRADAY",
        symbol: stockSymbol,
      },
      headers: {
        "x-rapidapi-key": apiKey1,
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      },
    });

    const data = response.data["Time Series (60min)"];

    return data;
  } catch (error) {
    console.error("Error fetching hourly data", error);
    throw error;
  }
};
