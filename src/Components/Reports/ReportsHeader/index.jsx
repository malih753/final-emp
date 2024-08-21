import React, { useState } from "react";
import SearchBar from "../../TextField/SearchBar";
import Button from "../../Button";
import DatePicker from "react-datepicker";
import { FaAngleRight } from "react-icons/fa";
import { HeaderWrapper } from "./ReportsHeader.styles";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "../../Dropdown";
import report from "../../../assets/reports/report.png";

const ReportsHeader = ({ exportData, searchQuery, setSearchQuery }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [toggleDropdownType, setToggleDropdownType] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const sessionTypeItems = [
    { label: "Session Analysis", link: "/reports" },
    { label: "Anonymous Forum", link: "/reports/Anonymousforum" },
    { label: "Active and Inactive Employee", link: "/reports/ActiveInActive" },
    { label: "Coach Feedback Analysis", link: "/reports/CoachFeedback" },
    { label: "Session Feedback Analysis", link: "/reports/SessionFeedback" },
    { label: "Coach Report", link: "/reports/CoachReport" },
  ];

  const toggleCalendar = () => setShowCalendar(!showCalendar);
  const toggleDate = () => setShowDate(!showDate);
  const handleToggleDropdownTopic = () => setToggleDropdownType(!toggleDropdownType);

  const handleDropdownSelect = (item) => {
    console.log("Selected Item:", item);
    setSelectedType(item.label); // Update the selectedType in parent component
    setToggleDropdownType(false); // Optionally close the dropdown
  };

  return (
    <HeaderWrapper>
      <div className="sessionHolder">
        <Dropdown
          isOpen={toggleDropdownType}
          toggleDropdown={handleToggleDropdownTopic}
          items={sessionTypeItems}
          onSelect={handleDropdownSelect} // Ensure this handles dropdown selection
        >
          Filter <FaAngleRight />
        </Dropdown>
        <div className="calendar">
          <Button type="outline" width="150px" onClick={toggleCalendar}>
            From date
            <FaAngleRight />
          </Button>
          {showCalendar && (
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              inline
              minDate={new Date()}
            />
          )}
        </div>
        <div className="calendar">
          <Button type="outline" width="150px" onClick={toggleDate}>
            To date
            <FaAngleRight />
          </Button>
          {showDate && (
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              inline
              minDate={new Date()}
            />
          )}
        </div>
      </div>
      <div className="searchbar">
        <SearchBar 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} // Ensure SearchBar updates searchQuery
        />
      </div>
      <div className="export">
        <Button 
          width="208px" 
          onClick={() => {
            console.log("Export Button Clicked");
            exportData(selectedType || "Session Analysis");
          }} // Ensure this triggers the export function with the selected type
          disabled={!selectedType} // Disable button if no type is selected
        >
          <img src={report} alt="report" />
          Export To Excel
        </Button>
      </div>
    </HeaderWrapper>
  );
};

export default ReportsHeader;
