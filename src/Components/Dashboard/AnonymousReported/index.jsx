import React from "react";
import { ReportedWrap } from "./reported.styles";
import ReportsHeader from "../ReportsHeader";
import Table from "../../Table";
import { reportCol, reportData } from "../TableData";
import { useNavigate } from "react-router-dom";

const AnonymousReported = ({ anonymouslyReportedPost }) => {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate("/CardProgress");
  };

  const transformData = anonymouslyReportedPost?.map((p) => ({
    PostID: p.id,
    PostDate: new Date(p.createdAt).toLocaleDateString(),
    PostTime:new Date (p.createdAt).toLocaleTimeString(),
    PostBy: p.user.firstName + p.user.lastName,
    ReasonOfReport: p.reportList[0].message,
    ViewPost: { image: reportData[0].ViewPost.image },
  }));
  return (
    <ReportedWrap>
      <strong>Anonymous Reported Post</strong>
      <ReportsHeader />
      <strong>20 Jan 2024</strong>
      <div className="wrapper">
        <strong className="title"> Session Feedback</strong>
        <Table
          columns={reportCol}
          data={transformData}
          border={true}
          onImageClick={handleImageClick}
        />
      </div>
    </ReportedWrap>
  );
};

export default AnonymousReported;
