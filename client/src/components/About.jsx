import React, { useEffect, useState } from "react";
import Photo from "./UI/photo/Photo";
import avatarImage from "../components/icon/avatar2.jpg";
import linkedInImage from "../components/icon/LinkedIn_icon.svg.png";
import gmailImage from "../components/icon/gmailColor.png";
import gitHubImage from "../components/icon/github.svg";
const About = ({}) => {
  return (
    <div className="about">
      <div className="content">
        <div className="aboutAuthor">
          <div className="photoName">
            <Photo className="authorAvatar">
              <img
                style={{ width: "107%", height: "96%", borderRadius: "50%" }}
                src={avatarImage}
                alt=""
              />
            </Photo>
            <div style={{ maxWidth: "370px", marginLeft: "25px" }}>
              <h1 style={{ color: "rgba(39, 38, 67, 1)" }}>
                Artem Vitenko's Project
              </h1>
              <p
                style={{
                  color: "rgba(60, 59, 103, 1)",
                  lineHeight: "1.5",
                  marginTop: "5px",
                }}
              >
                Hello! My name is Artem and I am the author of this project. My
                main occupation is developing web applications on Node.js.
                Additionally, I am currently studying cybersecurity at
                university. I am always open to communication and ready to
                assist you whenever needed.
              </p>
            </div>
          </div>

          <div className="links ">
            <a
              href="https://www.linkedin.com/in/artem-vitenko-3b270924a/"
              target="_blank"
            >
              <img
                className="aboutIcon linked"
                src={linkedInImage}
                alt="linkedIn"
              />
            </a>

            <a
              href="https://github.com/ViArtem?tab=repositories"
              target="_blank"
            >
              <img
                className="aboutIcon linked"
                src={gitHubImage}
                alt="github"
              />
            </a>

            <a href="mailto:vitenkoartem.official.com" target="_blank">
              <img className="aboutIcon linked" src={gmailImage} alt="gmail" />
            </a>
          </div>
        </div>
        <div className="aboutProject">
          <div className="mainText">
            <h1>About the project</h1>
            <p className="fistPageSubtitle" style={{ lineHeight: "1.5" }}>
              This site uses WebSocket and http requests as the basis for
              interacting with the server. The Add Contact module is responsible
              for saving a new contact. The Find Contact module sends a request
              to the server with the name of the contact you need, where the
              request is processed and contact information is sent as a
              response. The Found Contacts module receives a response from the
              server and displays all available information about the contact,
              including their first name, last name, phone number, and avatar.
              Buttons for deleting and editing a contact appear if you have
              created it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
