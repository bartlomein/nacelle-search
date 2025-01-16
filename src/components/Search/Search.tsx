import React from "react";

type SearchProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

type SearchResult = {
  id: string;
  title: string;
  category: string;
};

const Search = () => {
  return <div></div>;
};

export default Search;
