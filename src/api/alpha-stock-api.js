import axios from "axios";
import { filterStock } from "../helpers/date-helper";
import SearchResults from "../components/SearchResults";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";

const baseURL = "https://alpha-vantage.p.rapidapi.com";
const apiKey = "d909d9eeb1mshf30fcff26ba595dp17ff0ajsn383e8fa50070";
const apiKey1 = "8a9595d8demshb06071760787a2ap1d293ejsn005267f3b2ec";

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
      `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=1RcrWN2kM3SqWTFXEFhxOkj9kZAbhm7i`
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
      `https://financialmodelingprep.com/api/v3/historical-chart/1hour/${stockSymbol}?&apikey=1RcrWN2kM3SqWTFXEFhxOkj9kZAbhm7i`
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
      `https://financialmodelingprep.com/api/v3/historical-price-full/${stockSymbol}?apikey=1RcrWN2kM3SqWTFXEFhxOkj9kZAbhm7i`
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
