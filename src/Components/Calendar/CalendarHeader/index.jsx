import React, { useState } from "react";
import SearchBar from "../../TextField/SearchBar";
import Button from "../../Button";
import DatePicker from "react-datepicker";
import { FaAngleDown } from "react-icons/fa6";
import { HeaderWrapper } from "./CalendarHeader.styles";
import { Link } from "react-router-dom";

const CalendarHeader = ({ title, setSessionType }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [toggleDropdownType, setToggleDropdownType] = useState(false);
  const [toggleDropdownTopic, setToggleDropdownTopic] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleToggleDropdownType = () => {
    setToggleDropdownType(!toggleDropdownType);
    if (!toggleDropdownType) {
      setToggleDropdownTopic(false);
    }
  };

  const handleToggleDropdownTopic = () => {
    setToggleDropdownTopic(!toggleDropdownTopic);
    if (!toggleDropdownTopic) {
      setToggleDropdownType(false);
    }
  };

  const handleSessionTypeClick = (type, event) => {
    event.preventDefault(); // Prevent default behavior of the link
    setSessionType(type);
    setToggleDropdownType(false);
  };

  const today = new Date();

  return (
    <HeaderWrapper $toggleDropDown={toggleDropdownType || toggleDropdownTopic}>
      <div className="searchbar">
        <SearchBar />
      </div>
      <div className="sessionHolder">
        <div className="calendar">
          <Button type="outline" width="150px" onClick={toggleCalendar}>
            Calendar
            <FaAngleDown />
          </Button>
          {showCalendar && (
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              inline
              minDate={today}
            />
          )}
        </div>
        <div className="type">
          <Button
            type="outline"
            width="175px"
            onClick={handleToggleDropdownType}
          >
            Session Type
            <FaAngleDown />
          </Button>
          {toggleDropdownType && (
            <div className="dropdown">
              <Link to="#" onClick={(e) => handleSessionTypeClick("1:1 Session", e)}>
                1 : 1 Session
              </Link>
              <Link to="#" onClick={(e) => handleSessionTypeClick("Group Session", e)}>
                Group Session
              </Link>
            </div>
          )}
        </div>
        <div className="type">
          <Button
            type="outline"
            width="175px"
            onClick={handleToggleDropdownTopic}
          >
            Session Topic
            <FaAngleDown />
          </Button>
          {toggleDropdownTopic && (
            <div className="dropdown">
              <Link to="#">{title}</Link>
            </div>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default CalendarHeader;
