import React, { useEffect, useState } from "react";
import Button from "../../Button";
import { IoIosArrowForward } from "react-icons/io";
import { AnalysisWrapper } from "./analysis.styles";
import KycLevel from "../../KycLevel";
import course from "../../../assets/home/course.png";
import PieArcLabel from "../PieChart/PieArcLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const bar = [
//   {
//     title: "Talent Management",
//     bgColor: "#58A7E0",
//     percent: "80",
//   },
//   {
//     title: "Women Empowerment",
//     bgColor: "#F0AC28",
//     percent: "50",
//   },
//   {
//     title: "Advisory Program",
//     bgColor: "#FFA5A5",
//     percent: "80",
//   },
//   {
//     title: "Employee Growth",
//     bgColor: "#8FE2FF",
//     percent: "35",
//   },
//   {
//     title: "Personal Development",
//     bgColor: "#F0D028",
//     percent: "70",
//   },
// ];
const card = [
  {
    hours: "10 Hrs",
    title: "Total Session Duration ",
    img: course,
  },
  {
    hours: "1000",
    title: "Total Number Of Sessions",
    img: course,
  },
  {
    hours: "1000",
    title: "Total Number Of Sessions",
    img: course,
  },
];

const AnalysisSession = ({ analysis }) => {
  console.log("analysis", analysis);

  const [cardsData, setCardsData] = useState([]);
  const [bar, setBar] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    if (analysis?.sessionAnalysisBar) {
      setCardsData([
        {
          title: "Total Session Duration ",
          img: course,
          count: analysis.sessionAnalysisBar.overallDuration,
        },
        {
          title: "Total Number Of Sessions",
          img: course,
          count: analysis.sessionAnalysisBar.overallSessionCount,
        },
        {
          title: "Total Number Of Attendee",
          img: course,
          count: analysis.sessionAnalysisBar.overallEnrolmentCount,
        },
      ]);
      const data = analysis.sessionAnalysisBar.categories.map((i) => ({
        title: i.categoryName,
        bgColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        percent: i.progressPercent.toString(),
      }));
      setBar(data);
    }
  }, [analysis]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <AnalysisWrapper>
      <div className="flex">
        <div className="text">
          <strong>Session Analysis</strong>
          <h4>20 Jan 2024</h4>
        </div>
        <div className="filterWrap">
          <Button>Today</Button>
          <Button
            type="white"
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            {startDate ? startDate.toLocaleDateString() : "Start Date"} -{" "}
            {endDate ? endDate.toLocaleDateString() : "End Date"}{" "}
            <IoIosArrowForward />
          </Button>
        </div>
      </div>
      {isDatePickerOpen && (
        <div className="date-picker-wrapper" style={{ position: 'absolute', top: '210px', right: '20px', zIndex: 1000 }}>
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
      <div className="holder">
        <div className="wrap">
          <div className="progress">
            {bar?.map((val, ind) => (
              <div className="progressWrap" key={ind}>
                <h4 className="title textWrap ">{val.title}</h4>
                <KycLevel level={val.percent} bg={val.bgColor} />
                <h4 className="textWrap">{val.percent}</h4>
              </div>
            ))}
          </div>
          <div className="hours">
            {cardsData?.map((val, ind) => (
              <div className="card" key={ind}>
                <div className="cardHead">
                  <strong>{val.count}</strong>
                  <img src={val.img} alt="course" />
                </div>
                <h4>{val.title}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className="barChart">
          <PieArcLabel data={bar} />
          <div className="detailChart">
            {bar?.map((b) => (
              <div key={b.title} className="textWrap">
                <div className="color" style={{ backgroundColor: b.bgColor }}></div>
                <span>{b.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnalysisWrapper>
  );
};

export default AnalysisSession;
