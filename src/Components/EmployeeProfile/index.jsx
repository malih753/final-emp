import React, { useState } from "react";
import { EmployeeWrap } from "./employeeProfile.styles";
import EmployeeHeader from "./EmployeeHeader";
import { Outlet } from "react-router-dom";
import * as XLSX from "xlsx";
import { AllData, ActiveData, DeactiveData } from "./EmployeeData";

const EmployeeProfile = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Normalize data
  const normalizeData = (data) => {
    return data.map(item => ({
      EmployeeName: item.EmployeeName?.text || item.EmployeeName || 'N/A',
      Role: item.Role || 'N/A',
      Contact: item.Contact || 'N/A',
      EmailID: item.EmailID || 'N/A',
      LastActive: item.LastActive || 'N/A',
      Status: item.Status?.buttons?.[0]?.text || item.status || 'N/A',
      DeactivateReason: item.Deactivate?.text || 'N/A'
      // Add other fields as needed
    }));
  };

  const handleExportData = (selectedType) => {
    let data;

    // Determine which data to use based on selectedType
    if (selectedType === "All Employee") {
      data = normalizeData(AllData);
    } else if (selectedType === "Activated Employee") {
      data = normalizeData(ActiveData);
    } else if (selectedType === "Deactivated Employee") {
      data = normalizeData(DeactiveData);
    }

    // Convert data to Excel sheet format
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    // Add sheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, selectedType);

    // Save workbook to file
    XLSX.writeFile(wb, "EmployeeData.xlsx");
  };

  return (
    <EmployeeWrap>
      <div className="header">
        <EmployeeHeader
          exportData={handleExportData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="content">
        <Outlet context={{ searchQuery }} />
      </div>
    </EmployeeWrap>
  );
};

export default EmployeeProfile;
