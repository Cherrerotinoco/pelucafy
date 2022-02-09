import React from "react";

import PropTypes from "prop-types";

const Title = ({ weight, align, children }) => {
  const style = `mx-4 my-2 drop-shadow text-${weight}xl md:text-${weight}xl text-white  font-bold leading-tight text-${align} md:text-${align}`;
  return <h1 className={style}>{children}</h1>;
};

Title.defaultProps = {
  children: PropTypes.any,
  weight: PropTypes.any,
  align: "left",
};
Title.propTypes = {
  children: PropTypes.any,
  weight: PropTypes.any,
  align: PropTypes.string,
};

export default Title;
