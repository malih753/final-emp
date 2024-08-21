import React, { useState } from "react";
import SearchBar from "../../TextField/SearchBar";
import Button from "../../Button";
import { FaAngleRight } from "react-icons/fa6";
import { HeaderWrapper } from "./employeeHeader.styles";
import Dropdown from "../../Dropdown";
import report from "../../../assets/reports/report.png";

const EmployeeHeader = ({ searchQuery, setSearchQuery, exportData }) => {
  const [toggleDropdownType, setToggleDropdownType] = useState(false);
  const [selectedType, setSelectedType] = useState("All Employee");

  const sessionTypeItems = [
    { label: "All Employee", link: "/EmployeeProfile" },
    { label: "Activated Employee", link: "/EmployeeProfile/ActivateEmployee" },
    { label: "Deactivated Employee", link: "/EmployeeProfile/DeactivateEmployee" },
  ];

  const handleToggleDropdownType = () => {
    setToggleDropdownType(!toggleDropdownType);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setToggleDropdownType(false); // Close dropdown after selection
  };

  const handleExport = () => {
    exportData(selectedType); // Pass selected type to export function
  };

  return (
    <HeaderWrapper>
      <div className="sessionHolder">
        <Dropdown
          isOpen={toggleDropdownType}
          toggleDropdown={handleToggleDropdownType}
          items={sessionTypeItems.map(item => ({
            ...item,
            onClick: () => handleSelectType(item.label),
          }))}
        >
          Filter <FaAngleRight />
        </Dropdown>
      </div>
      <div className="searchbar">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
      </div>
      <div className="export">
        <Button width="208px" onClick={handleExport}>
          <img src={report} alt="report" />
          Export To Excel
        </Button>
      </div>
    </HeaderWrapper>
  );
};

export default EmployeeHeader;
