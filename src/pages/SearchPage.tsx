import React, { useState } from "react";
import Search, { SearchResult } from "../components/Search/Search";

const SearchPage = () => {
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  return (
    <div>
      {selectedItem ? (
        <div>
          <div>Selected Item:</div>
          <div>{selectedItem.title}</div>
        </div>
      ) : null}
      <Search placeholder={"test"} onSelect={setSelectedItem} />
    </div>
  );
};

export default SearchPage;
