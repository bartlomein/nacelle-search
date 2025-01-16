import React, { useEffect, useState, KeyboardEvent } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";

type SearchProps = {
  onSelect: (query: SearchResult | null) => void;
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

const Search = ({ placeholder, onSelect }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      try {
        if (debouncedQuery.trim() === "") {
          setResults([]);
          setIsOpen(false);
        } else {
          const searchResults = onSearch(debouncedQuery);
          setResults(searchResults);
          setIsOpen(true);
          setFocusedIndex(-1);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred.");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelect = (item: SearchResult) => {
    onSelect(item);
    setQuery("");
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const clearInput = () => {
    setQuery("");
    setIsOpen(false);
    setFocusedIndex(-1);
    onSelect(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : results.length - 1;
        return newIndex;
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const newIndex = prev < results.length - 1 ? prev + 1 : 0;
        return newIndex;
      });
    }

    if (e.key === "Enter" && focusedIndex >= 0) {
      handleSelect(results[focusedIndex]);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full focus-within:border-blue-500 w-96 h-12">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
                {results.map((result, index) => (
                  <motion.li
                    key={result.id}
                    className={`p-2 cursor-pointer text-left transition-colors duration-150 ${
                      index === focusedIndex
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
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
