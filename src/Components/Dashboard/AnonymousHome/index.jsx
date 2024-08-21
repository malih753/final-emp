import React, { useState, useRef, useEffect } from "react";
import Button from "../../Button";
import { IoIosArrowForward } from "react-icons/io";
import { AnalysisWrapper } from "./Anonymous.styles";
import BasicLineChart from "../LineChart";
import PieLabel from "../PieChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AnonymousHome = ({ data }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef(null);

  const activeEmployeePercent1 = data?.employeeChart?.activeEmployee?.percent;
  const activeEmployeePercent2 = data?.employeeChart?.inActiveEmployee?.percent;

  const transformedEmployeChart = [
    {
      value:
        activeEmployeePercent1 === 0
          ? (Math.random() * 100).toFixed(0)
          : activeEmployeePercent1,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
    {
      value:
        activeEmployeePercent2 === 0
          ? (Math.random() * 100).toFixed(0)
          : activeEmployeePercent2,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
  ];

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleClickOutside = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setIsDatePickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AnalysisWrapper>
      <div className="holder">
        <div className="lineChart">
          <div className="flex">
            <div className="text">
              <strong>Anonymous Forum</strong>
            </div>
            <div className="filterWrap">
              <Button>Today</Button>
              <Button
                type="white"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                ref={datePickerRef}
              >
                {startDate ? startDate.toLocaleDateString() : "Start Date"} -{" "}
                {endDate ? endDate.toLocaleDateString() : "End Date"}{" "}
                <IoIosArrowForward />
              </Button>
              {isDatePickerOpen && (
        <div
          className="date-picker-wrapper"
          style={{
            position: "absolute",
            top:"25%",
            bottom: "0", 
            left: "100px",   
            zIndex: 1000,
          }}
        >
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()} // Disable previous dates
            inline
          />
        </div>
      )}
            </div>
          </div>
          <BasicLineChart data={data.anonymousForum} />
        </div>
        <div className="barChart">
          <div className="flex">
            <div className="text">
              <strong>Active/Inactive Employee</strong>
            </div>
            <div className="filterWrap">
              <Button>Today</Button>
            </div>
          </div>
          <PieLabel data={transformedEmployeChart} />
          <div className="detailChart">
            <div className="textWrap">
              <div
                className="color"
                style={{ backgroundColor: transformedEmployeChart[0].color }}
              ></div>
              <span>Active Employee</span>
            </div>
            <div className="textWrap">
              <div
                className="color"
                style={{ backgroundColor: transformedEmployeChart[1].color }}
              ></div>
              <span>Inactive Employee</span>
            </div>
          </div>
        </div>
      </div>
    
    </AnalysisWrapper>
  );
};

export default AnonymousHome;
