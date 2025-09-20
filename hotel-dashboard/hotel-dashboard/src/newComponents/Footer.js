import React from "react";

const Footer = () => (
  <footer
    style={{
      background: "#f5f5f5",
      padding: "16px 0",
      textAlign: "center",
      fontSize: "14px",
      color: "#888",
      borderTop: "1px solid #e0e0e0",
      marginTop: "auto",
    }}
  >
    © {new Date().getFullYear()} StayIq Hotel Dashboard. All rights reserved.
  </footer>
);

export default Footer;
