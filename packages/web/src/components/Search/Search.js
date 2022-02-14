import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch("");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const cleanSearch = () => {
    setSearch("");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-max"
            type="text"
            placeholder="Search your song"
            name="search"
            value={search}
            id="search"
            onChange={handleChange}
          />
        </form>
      </div>
    </>
  );
};

export default Search;
