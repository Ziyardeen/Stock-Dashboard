import React, { useContext, useState } from "react";

import SearchResults from "./SearchResults";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ThemeContext from "../Context/ThemeContext";
import { searchSymbol } from "../api/alpha-stock-api";
import ThemeIcon from "./ThemeIcon";

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState("");
  const { darkMode } = useContext(ThemeContext);

  const clear = () => {
    setBestMatches([]);
    setInput("");
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        console.log(searchResults, "search Results");
        setBestMatches(searchResults);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  return (
    <div
      className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96${
        darkMode
          ? "bg-gray-900 border-gray-800"
          : " bg-white border-neutral-200 "
      }`}
    >
      <input
        type="text"
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${
          darkMode ? "bg-gray-900" : null
        }`}
        placeholder="Search stock....."
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      />
      {input && (
        <button onClick={clear} className="m-1">
          <XMarkIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}

      <button
        onClick={updateBestMatches}
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition-duration-300 hover:ring-2 ring-indigo-400"
      >
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-500" />
      </button>

      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}
    </div>
  );
};

export default Search;
