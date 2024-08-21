import React, { useState } from "react";
import SearchBar from "../../TextField/SearchBar";
import { FaAngleRight } from "react-icons/fa6";
import { HeaderWrapper } from "./ReportsHeader.styles";
import Dropdown from "../../Dropdown";

const AnonymousHeader = ({ setSearchQuery }) => {
  const [toggleDropdownType, setToggleDropdownType] = useState(false);
  const sessionTypeItems = [
    { label: "Discussion", link: "#" },
    { label: "Post", link: "#" },
    { label: "Polls", link: "#" },
  ];

  const handleToggleDropdownTopic = () => {
    setToggleDropdownType(!toggleDropdownType);
  };

  return (
    <HeaderWrapper>
      <div className="sessionHolder">
        <Dropdown
          isOpen={toggleDropdownType}
          toggleDropdown={handleToggleDropdownTopic}
          items={sessionTypeItems}
        >
          Filter <FaAngleRight />
        </Dropdown>
      </div>
      <div className="searchbar">
        <SearchBar onChange={(e) => setSearchQuery(e.target.value)} /> {/* Pass the onChange handler */}
      </div>
    </HeaderWrapper>
  );
};

export default AnonymousHeader;
