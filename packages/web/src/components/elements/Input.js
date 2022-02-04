import React from "react";

import PropTypes from "prop-types";

const Input = ({ type, name, value, isrequired, ...props }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        className={
          type === "checkbox"
            ? "shadow appearance-none border rounded "
            : "shadow appearance-none border rounded max-w-md w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        }
        value={value}
        {...props}
        required={isrequired}
      />
    </>
  );
};

Input.defaultProps = {
  type: "text",
  value: PropTypes.any,
  name: PropTypes.string,
  isrequired: true,
};
Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string,
  isrequired: PropTypes.bool,
};

export default Input;
