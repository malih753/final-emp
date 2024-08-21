import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { DropdownWrapper } from './Dropdown.styles';

const Dropdown = ({ isOpen, toggleDropdown, onSelect, items, children }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleItemClick = (item) => {
    if (item.link) {
      navigate(item.link); // Programmatically navigate to the link
    }
    if (onSelect) {
      onSelect(item); // Call the onSelect function with the selected item
    }
    toggleDropdown(); // Close the dropdown
  };

  return (
    <DropdownWrapper>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {children}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <div className='items' key={index} onClick={() => handleItemClick(item)}>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
