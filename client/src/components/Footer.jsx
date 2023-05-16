import React from "react";
import linkedInImage from "../components/icon/LinkedIn_icon.svg.png";
import gmailImage from "../components/icon/gmailColor.png";
import gitHubImage from "../components/icon/github.svg";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <a
          className="linkedinLogo"
          href="https://www.linkedin.com/in/artem-vitenko-3b270924a/"
          target="_blank"
        >
          <img className="footerIcon" src={linkedInImage} alt="linkedIn" />
        </a>
        <a
          className="githubLogo"
          href="https://github.com/ViArtem?tab=repositories"
          target="_blank"
        >
          <img className="footerIcon" src={gitHubImage} alt="github" />
        </a>

        <a
          className="gmailLogo"
          href="mailto:vitenkoartem.official.com"
          target="_blank"
        >
          <img className="footerIcon" src={gmailImage} alt="gmail" />
        </a>
      </div>
    </div>
  );
};
export default Footer;
