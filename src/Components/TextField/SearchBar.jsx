import React from "react";
import { SearchbarWrap } from "./Texfield.styles";
import TextField from "./TextField";
import { CiSearch } from "react-icons/ci";
import { useSearch } from "../SearchContext";  // Import context

const SearchBar = ({ onChange }) => {
  const { searchTerm, setSearchTerm } = useSearch();  // Use context

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);  // Update the context state

    // Call the onChange function passed as a prop if it exists
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <SearchbarWrap>
      <TextField
        className="input-field"
        parentClass="customClass"
        field_Name="text"
        type="text"
        hasicon={<CiSearch />}
        placeholder="Search"
        border="#ddd"
        bgClr="#fff"
        onChange={handleInputChange}  // Use the updated handleInputChange function
        value={searchTerm}
      />
    </SearchbarWrap>
  );
};

export default SearchBar;
