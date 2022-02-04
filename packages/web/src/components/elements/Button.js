import React from "react";

import PropTypes from "prop-types";

const Button = ({ children, submit, disabled, styles, ...props }) => {
  const style = {
    background:
      "bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1",
    noBackground:
      "bg-gradient-to-r  hover:from-gray-900 to-sky-300 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1",
    noBackgroundHover:
      "bg-gradient-to-r text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1",
  };
  return (
    <>
      <button
        className={style[styles]}
        type={submit ? "submit" : "button"}
        {...props} // ! event
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

Button.defaultProps = {
  submit: false,
  styles: "background",
  disabled: false,
  children: null,
};
Button.propTypes = {
  submit: PropTypes.bool,
  disabled: PropTypes.bool,
  styles: PropTypes.string,
  children: PropTypes.any,
};

export default Button;
