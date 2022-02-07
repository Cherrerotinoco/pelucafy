import React from "react";

import PropTypes from "prop-types";

const Button = ({ children, submit, disabled, styles, ...props }) => {
  const style = {
    noBackgroundHover:
      "bg-gradient-to-r text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1",

    ring: "ring text-white max-w-md font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1",

    noRing:
      "text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1",
    light:
      "bg-black light text-white max-w-sm font-bold py-2 px-3 mx-3 rounded-xs focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1",
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
