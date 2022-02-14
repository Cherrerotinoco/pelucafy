import React, { useState } from "react";
import PropTypes from "prop-types";

const InputSearch = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const cleanSearch = () => {
    setSearch("");
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="w-max"
            type="text"
            placeholder="Search your song"
            name="search"
            value={search}
            id="search"
            onChange={handleChange}
          />
          <button className="text-white" type="button" onClick={cleanSearch}>
            X
          </button>
        </form>
      </div>
    </>
  );
};

export default InputSearch;

InputSearch.defaultProps = {
  search: null,
  setSearch: null,
};
InputSearch.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
