import { useState } from "react";
import "./App.css";
import Search, { SearchResult } from "./components/Search/Search";

function App() {
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);

  return (
    <>
      {selectedItem ? (
        <div>
          <div>Selected Item:</div>
          <div>{selectedItem.title}</div>
        </div>
      ) : null}
      <Search placeholder={"test"} onSelect={setSelectedItem} />
    </>
  );
}

export default App;
