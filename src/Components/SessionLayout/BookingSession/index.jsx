import React, { useState } from "react";
import backimg from "../../../assets/support/backArrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "../../TextField/TextField";
import Button from "../../Button";
import { ExperienceWrap } from "./Experience.styles";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../../Modal";
import thumb from "../../../assets/header/thumb.png";
import calendar from "../../../assets/session/calendar.png";
import time from "../../../assets/session/time.png";
import { useAuth } from "../../Context/Context";

const BookingSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state?.sessionData || {};
  const { setCalenderSession } = useAuth();

  console.log("Booking Session", sessionData);
  const [popup, setPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [yearsOptions, setYearsOptions] = useState([
    { label: "1:1 Session", value: "session", checked: false },
    { label: "Group Session", value: "groupSession", checked: false },
    { label: "Upcoming Session", value: "upcomingSession", checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    const newOptions = [...yearsOptions];
    newOptions[index].checked = !newOptions[index].checked;
    setYearsOptions(newOptions);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const getSelectedOptionsText = () => {
    return (
      yearsOptions
        .filter((option) => option.checked)
        .map((option) => option.label)
        .join(", ") || "Select..."
    );
  };

  const backToSession = () => {
    const sessionType = yearsOptions.filter((y) => y.checked);
    setCalenderSession({ ...sessionData, sessionType: sessionType[0].value });
    navigate("/calendar", { state: { session: sessionData } });
  };

  const openPopup = () => {
    setPopup(true);
  };

  return (
    <ExperienceWrap>
      <div className="info" onClick={backToSession}>
        <img src={backimg} alt="back" />
        <h4 className="heading">Book Group Session</h4>
      </div>
      <label>
        Select Session Type
        <div className="dropdown-container">
          <div className="dropdown-header" onClick={toggleDropdown}>
            {getSelectedOptionsText()}
            <RiArrowDropDownLine size={24} />
          </div>
          {dropdownOpen && (
            <div className="dropdown">
              {yearsOptions.map((option, index) => (
                <div key={option.value} className="dropdown-option">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={option.checked}
                    onChange={() => handleCheckboxChange(index)}
                    id={option.value}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </label>
      <div className="fieldWrap">
        <TextField
          variant="textarea"
          label="Session Name"
          parentClass="textareaHolder"
          value={sessionData.title || ""}
        />
        <TextField
          parentClass="inputHolder"
          className="input-field"
          field_Name="Coach"
          type="text"
          label="Coach"
          name="Coach"
          bgClr="transparent"
          value={`${sessionData.firstName || ""} ${sessionData.lastName || ""}`}
        />
      </div>
      <div className="fieldWrap">
        <TextField
          parentClass="inputHolder"
          className="input-field"
          field_Name="SessionDay"
          type="text"
          label="Session Day"
          name="SessionDay"
          bgClr="transparent"
          value={sessionData.startDate || ""}
        />
        <TextField
          parentClass="inputHolder"
          className="input-field"
          field_Name="SessionTime"
          type="text"
          label="Session Time"
          name="SessionTime"
          bgClr="transparent"
          value={`${sessionData.startTime || ""} - ${
            sessionData.endTime || ""
          }`}
        />
      </div>
      <div className="btn" onClick={openPopup}>
        <Button width="177px">Book</Button>
      </div>
      {popup && (
        <Modal open={popup} setOpen={setPopup} width="590px">
          <div className="bookedPopup" onClick={backToSession}>
            <div className="popupWrap">
              <div className="thumb">
                <img src={thumb} alt="thumb" />
              </div>
              <strong className="title">Session Booked !</strong>
              <strong className="subTitle">
                {sessionData.title ||
                  "Change Management : Leading Agile Systems Change"}
              </strong>
              <span className="name">
                By : {sessionData.firstName || "Surbhi Mehta"}
              </span>
              <div className="timeWrap">
                <div className="time">
                  <img src={calendar} alt="calendar" />
                  {sessionData.startDate || "April 30, 2024"}
                </div>
                <div className="time">
                  <img src={time} alt="time" />
                  {sessionData.startTime || "09:00 pm"}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </ExperienceWrap>
  );
};

export default BookingSession;
