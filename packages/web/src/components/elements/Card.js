import React from "react";

import PropTypes from "prop-types";

/**
 * This component sets translucid background
 * @param {*} params {padding={number of rems for padding, children={any}}}
 * @returns JSX tailwind styled background
 */
const Card = ({ padding, children }) => {
  const style = `flex flex-col mx-1 p-${padding} lightBackgroun w-auto`;
  return (
    <section className="p-2 ">
      <div className={style}>{children}</div>
    </section>
  );
};

Card.defaultProps = {
  children: PropTypes.any,
  padding: "4",
};
Card.propTypes = {
  children: PropTypes.any,
  padding: PropTypes.string,
};

export default Card;
