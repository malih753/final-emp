import React, { useState, useEffect } from "react";
import { CalendarWrap } from "./Calendar.styles";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CalendarHeader from "./CalendarHeader";
import TimeSlots from "./TimeSlots";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Context/Context";
import { format, addDays } from "date-fns";
import Employee from "./LectureSchedule/Employe";
const Calendar = () => {
  const [showInnovation, setShowInnovation] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // State for current date
  const [sessionType, setSessionType] = useState(""); // State for session type
  const { calenderSession } = useAuth();
  console.log("cl", calenderSession);
  const location = useLocation(); 
  const {  selectedSessionTypes, coachName, name, selectedDate, selectedTime, selectedEndTime } = location.state || {};
  useEffect(() => {
    console.log("Selected Session Types:", selectedSessionTypes);
    console.log("Coach Name:", coachName);
    console.log("Session Name:", name);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    console.log("Selected End Time:", selectedEndTime);
  }, [ selectedSessionTypes, coachName, name, selectedDate, selectedTime, selectedEndTime]);
  const openInnovation = () => {
    setShowInnovation(true);
  };

  const BackToPage = () => {
    setShowInnovation(false);
  };
  const handleNext = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 1)); // Move to next day
  };

  const handlePrevious = () => {
    const today = new Date(); // Current date
    if (currentDate <= today) {
      return;
    }
    setCurrentDate((prevDate) => addDays(prevDate, -1)); // Move to previous day
  };

  const formattedDate = format(currentDate, "EEEE, MMMM d yyyy");
  return (
    <>
      {!showInnovation ? (
        <CalendarWrap>
          <h4>
            {formattedDate}
            <FaAngleLeft
              onClick={handlePrevious}
              style={{ cursor: "pointer" }}
            />
            <FaAngleRight onClick={handleNext} style={{ cursor: "pointer" }} />
          </h4>
          <CalendarHeader
            title={calenderSession?.sessionType}
            setSessionType={setSessionType}
          />
          <TimeSlots
            click={openInnovation}
            selectedDate={new Date(calenderSession?.startDate
              || selectedDate
            )}
            selectedTime={calenderSession?.startTime || selectedTime}
            selectedEndTime={calenderSession?.endTime || selectedEndTime}
            name={calenderSession?.title || coachName}
            coachName={calenderSession?.firstName + calenderSession?.lastName || coachName}
            title={calenderSession?.title || name}
            sessionType={sessionType || selectedSessionTypes} // Pass session type to TimeSlots
            sessionDetails={calenderSession}
            selectedEndDate= {calenderSession?.endDate || selectedDate}

          />
        </CalendarWrap>
      ) : (
        <Employee sessionDetails={calenderSession} BackToPage={BackToPage} />
      )}
    </>
  );
};

export default Calendar;
