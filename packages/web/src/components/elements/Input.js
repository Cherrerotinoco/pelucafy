import React from "react";

import PropTypes from "prop-types";

const Input = ({ type, name, value, isrequired, action }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        value={value}
        onChange={action}
        required={isrequired}
      />
    </>
  );
};

Input.defaultProps = {
  type: "text",
  action: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.string,
  isrequired: true,
};
Input.propTypes = {
  type: PropTypes.string,
  action: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.string,
  isrequired: PropTypes.bool,
};

export default Input;
