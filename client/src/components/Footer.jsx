import React from "react";
import linkedInImage from "../components/icon/linkedin.svg";
import gmailImage from "../components/icon/gmail-svgrepo-com.svg";
import gitHubImage from "../components/icon/github-svgrepo-com.svg";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <a href="https://www.linkedin.com/in/artem-vitenko-3b270924a/">
          <img
            className="footerIcon linked"
            src={linkedInImage}
            alt="linkedIn"
          />
        </a>
        {/*   https://mail.google.com/mail/?view=cm&to=*/}
        <a href="mailto:vitenkoartem.official.com">
          <img className="footerIcon" src={gmailImage} alt="gmail" />
        </a>
        <a href="https://github.com/ViArtem?tab=repositories">
          <img className="footerIcon" src={gitHubImage} alt="github" />
        </a>
      </div>
    </div>
  );
};
export default Footer;
