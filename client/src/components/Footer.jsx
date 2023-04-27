import React from "react";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="textContent">
          <p className="owner">
            Creator: <span>Artem Vitenko</span>
          </p>
          <p className="email">
            Email: <span>vitenkoartem7@gmail.com</span>
          </p>
        </div>
        <div className="linkContent">
          <a href="http://">LinkedIn</a> <br />
          <a href="http://">GitHub</a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
