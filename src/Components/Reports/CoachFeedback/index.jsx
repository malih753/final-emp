import React, { useState } from "react";
import { useSearch } from "../../SearchContext"; // Import search context
import Table from "../../Table";
import { CoachFeedbackCol, CoachFeedbackData } from "../ReportData";
import Modal from "../../Modal/index";
import FeedbackPopup from "../FeedbackPopup";

const CoachFeedback = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { searchTerm } = useSearch(); // Access search term from context

  // Ensure searchTerm is a string and provide fallback if undefined
  const safeSearchTerm = searchTerm || '';

  // Filter data based on searchTerm
  const filteredData = CoachFeedbackData.filter((item) => {
    // Assuming `item.feedback` is the property you're searching against
    const feedback = item.CoachName.text || ''; // Fallback to empty string if feedback is undefined
    return feedback.toLowerCase().includes(safeSearchTerm.toLowerCase());
  });

  const handleImageClick = () => {
    setFeedbackOpen(true);
  };

  return (
    <div>
      <div className="wrapper">
        <strong className="title">Coach Feedback</strong>
        <Table
          columns={CoachFeedbackCol}
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
    </div>
  );
};

export default CoachFeedback;
