import React, { useState, useEffect } from "react";
import { ModalsWrap } from "./Modals.styles";
import back from "../../../assets/session/backarrow.png";
import calendar from "../../../assets/session/calendar.png";
import time from "../../../assets/session/time.png";
import Button from "../../Button";
import { RiArrowDropDownLine } from "react-icons/ri";
import TextField from "../../TextField/TextField";

const Session = ({
  setOpen,
  selectedDate,
  selectedTime,
  selectedEndTime,
  click,
  setSelectedSessionTypes,
  setInputFieldData,
}) => {
  const [yearsDropdownOpen, setYearsDropdownOpen] = useState(false);
  const [isValid, setIsValid] = useState(true); // Initially true to avoid warnings on load
  const [warningMessage, setWarningMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [yearsOptions, setYearsOptions] = useState([
    { label: "1:1 Session", value: "session", checked: false },
    { label: "Group Session", value: "groupSession", checked: false },
    { label: "Upcoming Session", value: "upcomingSession", checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    const newOptions = [...yearsOptions];
    newOptions[index].checked = !newOptions[index].checked;
    setYearsOptions(newOptions);
    setSelectedSessionTypes(
      newOptions
        .filter((option) => option.checked)
        .map((option) => option.label)
    );
  };

  const toggleDropdown = () => {
    setYearsDropdownOpen((prevState) => !prevState);
  };

  const getSelectedOptionsText = (options) => {
    const selectedOptions = options.filter((option) => option.checked);

    if (selectedOptions.length === 0) {
      return "Select...";
    }

    return selectedOptions.map((option) => option.label).join(", ");
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setInputFieldData(value);
  };

  const validateForm = () => {
    const isSessionTypeSelected = yearsOptions.some(
      (option) => option.checked
    );
    const isInputFilled = inputValue.trim() !== "";
    const isValid = isSessionTypeSelected && isInputFilled;

    setIsValid(isValid);

    if (!isValid) {
      setWarningMessage("Please fill in all required fields.");
    } else {
      setWarningMessage("");
    }
  };

  const handleClick = () => {
    validateForm();
    if (isValid) {
      click();
    }
  };

  useEffect(() => {
    validateForm();
  }, [yearsOptions, inputValue]);

  return (
    <ModalsWrap>
      <div className="backicon" onClick={() => setOpen(false)}>
        <img src={back} alt="back" />
      </div>
      <h2>1:1 Session</h2>
      <div className="textWrap">
        <p>Change Management : Leading Agile Systems Change</p>
        <span>
          <img src={calendar} alt="calendar" />
          {selectedDate.toDateString()}
        </span>
        <span>
          <img src={time} alt="time" />
          {selectedTime} - {selectedEndTime}
        </span>
      </div>
      <div className="fieldWrap">
        <div className="dropdown-container">
          <div className="dropdown-header" onClick={toggleDropdown}>
            {getSelectedOptionsText(yearsOptions)}
            <RiArrowDropDownLine size={24} />
          </div>
          {yearsDropdownOpen && (
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
        <TextField
          parentClass="inputHolder"
          className="input-field"
          field_Name="SessionDay"
          type="text"
          placeholder="Add employee / group"
          name="SessionDay"
          bgClr="transparent"
          onChange={handleInputChange}
        />
      </div>
      {warningMessage && <p className="warning-message">{warningMessage}</p>}
      <div className="btn">
        <Button width="176px" onClick={handleClick}>
          Schedule
        </Button>
      </div>
    </ModalsWrap>
  );
};

export default Session;
