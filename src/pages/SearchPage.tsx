import React, { useState } from "react";
import Search, { SearchResult } from "../components/Search/Search";
import { motion, AnimatePresence } from "framer-motion";

const SearchPage = () => {
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0">
        <div className="max-w-4xl mx-auto w-full px-4 py-3">
          <Search placeholder="test" onSelect={setSelectedItem} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 py-10 mt-40">
        <AnimatePresence mode="wait">
          {selectedItem && (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg font-semibold text-gray-900 mb-1"
                  >
                    {selectedItem.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-500"
                  >
                    Category: {selectedItem.category}
                  </motion.div>
                </div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                >
                  {selectedItem.id}
                </motion.span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-4 border-t border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className=" flex text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear selection
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPage;
