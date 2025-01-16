import React, { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";

type SearchProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export type SearchResult = {
  id: string;
  title: string;
  category: string;
};

const sampleData: SearchResult[] = [
  { id: "1", title: "React Basics", category: "Frontend" },
  { id: "2", title: "TypeScript Tutorial", category: "Language" },
  { id: "3", title: "Frontend Testing", category: "Testing" },
  { id: "4", title: "Redux Guide", category: "State Management" },
  { id: "5", title: "React Hooks Demo", category: "Frontend" },
];

const onSearch = (query: string): SearchResult[] => {
  return sampleData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
};

const Search = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      if (debouncedQuery.trim() === "") {
        setResults([]);
        setIsOpen(false);
      } else {
        const searchResults = onSearch(debouncedQuery);
        setResults(searchResults);
        setIsOpen(true);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSelect(null);
  };

  const handleSelect = (item: SearchResult) => {
    onSelect(item);
    setQuery("");
    setIsOpen(false);
  };

  const clearInput = () => {
    setQuery("");
    setIsOpen(false);
    onSelect(null);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full focus-within:border-blue-500 w-96 h-12">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="flex-grow outline-none"
        />
        {query && (
          <button
            onClick={clearInput}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {isLoading && (
        <div className="mt-2 text-center text-gray-500">Loading...</div>
      )}
      {error && <div className="mt-2 text-center text-red-500">{error}</div>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            {results.length > 0 ? (
              <ul className="w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-10">
                {results.map((result) => (
                  <motion.li
                    key={result.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => handleSelect(result)}
                  >
                    <span className="font-bold">{result.title}</span>
                    <span className="text-gray-500 ml-2">
                      - {result.category}
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              query.trim() !== "" &&
              !isLoading &&
              !error && (
                <div className="w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-10 p-2 text-center text-gray-500">
                  No results found.
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
