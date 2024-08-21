import React from "react";
import { LectureWrap } from "./Lecture.styles";
import img1 from "../../../assets/session/profileBG.png";
import author from "../../../assets/session/logo.png";
import stars from "../../../assets/session/stars.png";
import date from "../../../assets/session/calendar.png";
import time from "../../../assets/session/time.png";
import sessionicon from "../../../assets/session/employes.png";
import Accordions from "../../Accordions";
import { items } from "../../Constant/Data";
import backicon from "../../../assets/session/backarrow.png";
import { useNavigate, useLocation } from "react-router-dom";

const LectureSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, start, end, coach} = location.state || {};

  const BacktoPage = () => {
    navigate("/Calendar");
  };

  return (
    <LectureWrap>
      <div className="backimg" onClick={BacktoPage}>
        <img src={backicon} alt="Back" />
      </div>
      <div className="lectures">
        <div className="sessionDetail">
          <div className="textHolder">
            <h2>{name || "Change Management : Leading Agile Systems Change Management"}</h2>
            <div className="auhtorDetail">
              <figure>
                <img src={author} alt="author" />
              </figure>
              <div className="name">
                <h5>By : {coach}</h5>
                <span>
                  Talent <br /> Management
                </span>
                <img src={stars} alt="stars" />
              </div>
            </div>
            <div className="date flex">
              <figure>
                <img src={date} alt="date" />
              </figure>
              <span>{start ? new Date(start).toLocaleDateString() : "April 30, 2024 - May 07, 2024"}</span>
            </div>
            <div className="time flex">
              <figure>
                <img src={time} alt="time" />
              </figure>
              <span>{start && end ? `${new Date(start).toLocaleTimeString()} - ${new Date(end).toLocaleTimeString()}` : "09:00 pm - 11:00 pm"}</span>
            </div>
            <div className="session flex">
              <figure>
                <img src={sessionicon} alt="session" />
              </figure>
              <span>20 Employees Enrolled</span>
            </div>
          </div>
          <figure className="thumb">
            <img src={img1} alt="img1" />
          </figure>
        </div>
        <div className="sessionPara">
          <h5>About Session</h5>
          <p>
            Change is now and forever. It is not optional any more than breathing
            and sleeping and doing it well is a requirement of organization
            health. Learning to capture the competitive advantage of a changing
            landscape is an essential skill for leaders.
            <br />
            This course is based on the forty five years of experience helping
            companies like Merck, Shell Oil, Honeywell, Honda and dozens of others
            to create cultures of engagement and continuous improvement.
          </p>
        </div>
        <div className="accordion">
          <h5>Topics</h5>
          <Accordions items={items} />
        </div>
      </div>
    </LectureWrap>
  );
};

export default LectureSchedule;
