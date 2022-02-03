import React from "react";

import PropTypes from "prop-types";

const Input = ({ name, value, action }) => {
  return (
    <>
      <input
        type={name}
        id={name}
        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        value={value}
        onChange={action}
      />
    </>
  );
};

Input.defaultProps = {
  action: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.string,
};
Input.propTypes = {
  action: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.string,
};

export default Input;
