import React from "react";

import PropTypes from "prop-types";

const Button = ({ action, children }) => {
  return (
    <>
      <button
        className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
        type="button"
        onClick={action}
      >
        {children}
      </button>
    </>
  );
};

Button.defaultProps = {
  action: PropTypes.any,
  children: PropTypes.any,
};
Button.propTypes = {
  action: PropTypes.any,
  children: PropTypes.any,
};

export default Button;
