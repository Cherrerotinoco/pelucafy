import React from "react";

import PropTypes from "prop-types";

const Card = ({ children }) => {
  return (
    <section className="p-2 ">
      <div className="flex flex-col mx-1 p-4 lightBackgroun w-auto ">
        {children}
      </div>
    </section>
  );
};

Card.defaultProps = {
  children: PropTypes.any,
};
Card.propTypes = {
  children: PropTypes.any,
};

export default Card;
