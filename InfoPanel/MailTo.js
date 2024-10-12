import React from "react";

const MailTo = ({ children, styles, mail, onMouseEnter, onMouseLeave }) => {
  return (
    <a
      style={styles}
      href={`mailto:${mail}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

export default MailTo;
