import React, { useEffect, useState } from "react";
import Card from "./Card";

const Overview = ({ quote }) => {
  const [details, setDetails] = useState([]);

  console.log(quote, "?????Quote???????");

  return (
    <Card>
      <span className="absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
        {quote["01. symbol"]}
      </span>
      <div className="w-full h-full flex items-center justify-around">
        <span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
          {quote["05. price"]}
        </span>
        <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
          {"USD"}
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            quote["09. change"] > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {quote["09. change"]} <span>({quote["change percent"]}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
