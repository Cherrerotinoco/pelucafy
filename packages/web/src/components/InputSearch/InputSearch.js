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
            className="m-5 shadow appearance-none border rounded max-w-md w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="text"
            placeholder="Search something"
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

export default InputSearch;

InputSearch.defaultProps = {
  search: null,
  setSearch: null,
};
InputSearch.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
