import React from "react";
import linkedInImage from "../components/icon/LinkedIn_icon.svg.png";
import gmailImage from "../components/icon/gmailColor.png";
import gitHubImage from "../components/icon/github.svg";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <a href="https://www.linkedin.com/in/artem-vitenko-3b270924a/">
          <img className="footerIcon" src={linkedInImage} alt="linkedIn" />
        </a>
        <a href="https://github.com/ViArtem?tab=repositories">
          <img className="footerIcon" src={gitHubImage} alt="github" />
        </a>

        <a href="mailto:vitenkoartem.official.com">
          <img className="footerIcon" src={gmailImage} alt="gmail" />
        </a>
      </div>
    </div>
  );
};
export default Footer;
