import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Title, { ManageTitle } from "../Title";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../SearchContext";

const localizer = momentLocalizer(moment);

const TimeSlots = ({
  coachName,
  name,
  title,
  click,
  selectedDate,
  selectedTime,
  selectedEndTime,
  sessionType,
  selectedEndDate,
  user,
}) => {
  const CustomEvent = ({ event }) => {

    console.log("CustomEvent rendering:", event);
    if (event.title === "Title") {
      return <Title user={coachName || "Fasiha"} title={title} />;
    } else if (event.title === "ManageTitle") {
    ;
    } else {
      return <span>{event.title || ""}</span>;
    }
    // return <Title user={coachName} title={title} />
    // return <ManageTitle />
  };
  const { searchTerm } = useSearch();
  const today1 = new Date(selectedDate);
  const today2 = new Date(selectedEndDate);
  console.log("Start calendar time:", selectedTime);
  console.log("End calendar time:", selectedEndTime);
  console.log("user name here:", name);

  // Parse the selectedTime and selectedEndTime strings
  const parsedSelectedTime = moment(selectedTime, "h:mm a");
  const parsedSelectedEndTime = moment(selectedEndTime, "h:mm a");

  // Create new Date objects with the parsed time values
  const startDateTime = new Date(selectedDate);
  startDateTime.setHours(
    parsedSelectedTime.hours(),
    parsedSelectedTime.minutes()
  );

  const endDateTime = new Date(selectedDate);
  endDateTime.setHours(
    parsedSelectedEndTime.hours(),
    parsedSelectedEndTime.minutes()
  );

  // Define your events with name property
  const allEvents = [
    {
      id: 1,
      title: "Title",
      name:coachName, // Example name
      type: sessionType, // Add session type
      start: startDateTime,
      end: endDateTime,
      coach: coachName,
    },
    {
      id: 2,
      title: "ManageTitle",
      coach: "Jane Smith",
      name: "Jane Smith", // Example name
      type: "Group Session", // Add session type
      start: new Date(
        today1.getFullYear(),
        today1.getMonth(),
        today1.getDate(),
        5,
        15
      ),
      end: new Date(
        today2.getFullYear(),
        today2.getMonth(),
        today2.getDate(),
        6,
        15
      ),
    },
  ];

  const navigate = useNavigate();
  const handleEventClick = (event) => {
    const state = {
      coach: event.coach,
      name: event.name,
      start: event.start,
      end: event.end,
      type: event.type,
    };
    if (event.title === "Title") {
      navigate("/LectureSchedule", { state });
    } else if (event.title === "ManageTitle") {
      navigate("/employee", { state });
    } else {
      navigate("#", { state });
    }
  };
  const filteredEvents = allEvents.filter(
    (event) =>
      event.coach?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!sessionType || event.type === sessionType)
  );
  return (
    <div style={{ height: 800 }}>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        views={["day"]}
        defaultView="day"
        defaultDate={new Date()}
        onSelectEvent={handleEventClick}
        components={{
          event: CustomEvent,
        }}
      />
    </div>
  );
};

export default TimeSlots;
