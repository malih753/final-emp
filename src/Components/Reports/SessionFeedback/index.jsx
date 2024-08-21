import React, { useState } from "react";
import { useSearch } from "../../SearchContext"; // Import search context
import Table from "../../Table";
import { feedbackCol, feedbackData } from "../ReportData";
import Modal from "../../Modal";
import FeedbackPopup from "../FeedbackPopup";
import { FeedbackWrap } from "./feedback.styles";

const SessionFeedback = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { searchTerm } = useSearch(); // Access search term from context

  const safeSearchTerm = searchTerm || '';

  // Filter data based on searchTerm
  const filteredData = feedbackData.filter((item) => {
    // Assuming `item.feedback` is the property you're searching against
    const feedback = item.SessionNames || ''; // Fallback to empty string if feedback is undefined
    return feedback.toLowerCase().includes(safeSearchTerm.toLowerCase());
  });

  const handleImageClick = () => {
    setFeedbackOpen(true);
  };

  return (
    <FeedbackWrap>
      <div className="wrapper">
        <strong className="title">Session Feedback</strong>
        <Table
          columns={feedbackCol}
          data={filteredData} // Use filtered data
          border={true}
          onImageClick={handleImageClick}
        />
      </div>
      {feedbackOpen && (
        <Modal open={feedbackOpen} setOpen={setFeedbackOpen} width="626px">
          <FeedbackPopup />
        </Modal>
      )}
    </FeedbackWrap>
  );
};

export default SessionFeedback;
