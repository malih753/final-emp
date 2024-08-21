import React from "react";
import { ModalsWrap } from "./Modals.styles";
import back from "../../../assets/session/backarrow.png";
import calendar from "../../../assets/session/calendar.png";
import time from "../../../assets/session/time.png";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

const Scheduled = ({ coachName,selectedDate, selectedTime,selectedEndTime, selectedSessionTypes, name, setOpen, click  }) => {
  const navigate = useNavigate();

  const handleDone = () => {
    
    navigate("/calendar", { state: { selectedSessionTypes,coachName, name, selectedDate, selectedTime, selectedEndTime } }); 
  };
  return (
    <ModalsWrap>
      <div className="backicon" onClick={() => setOpen(false)}>
        <img src={back} alt="back" />
      </div>

      <div className="schedule">
        <div className="heading">
          <h2>Session Scheduled</h2>
          <p>Session is added to calander</p>
        </div>
        <div className="wrapperr">
          <span>Group Session : {selectedSessionTypes.join(", ")}</span>
          <br />
          <strong>Change Management : {name}</strong>
          <div className="flex">
            <img src={calendar} alt="calendar" />
            {selectedDate.toDateString()}
          </div>
          <div className="flex">
            <img src={time} alt="tme" />
            {selectedTime} - {selectedEndTime}
          </div>
        </div>
        <div className="sessionBtn">
          <Button width="208px" onClick={handleDone}>
            Done
          </Button>
        </div>
      </div>
    </ModalsWrap>
  );
};

export default Scheduled;
