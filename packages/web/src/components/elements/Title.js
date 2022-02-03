import React from "react";

import PropTypes from "prop-types";

const Title = ({ weight, align, children }) => {
  const style = `m-4 text-${weight}xl md:text-4xl text-white  font-bold leading-tight text-${align} md:text-left`;
  return (
    <>
      <h1 className={style}>{children}</h1>
    </>
  );
};

Title.defaultProps = {
  children: PropTypes.any,
  weight: PropTypes.any,
  align: PropTypes.string,
};
Title.propTypes = {
  children: PropTypes.any,
  weight: PropTypes.any,
  align: PropTypes.string,
};

export default Title;
