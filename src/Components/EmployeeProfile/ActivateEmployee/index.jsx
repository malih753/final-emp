import React, { useEffect, useState } from "react";
import { ActivateWrap } from "./Activate.styles";
import ButtonTable from "../TableButton";
import { employeesCols } from "../EmployeeData";
import { useAuth } from "../../Context/Context";
import { useSearch } from "../../SearchContext";

const ActivateEmployee = () => {
  const { employees } = useAuth();
  const { searchTerm } = useSearch(); // Use the search term from context

  const [filteredActiveEmployees, setFilteredActiveEmployees] = useState([]);

  useEffect(() => {
    // Filter active employees
    const activeEmployees = employees.filter(
      (employee) => employee.Status.buttons[0].text === "Active"
    );

    // Further filter based on searchTerm
    const filteredEmployees = activeEmployees.filter((employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredActiveEmployees(filteredEmployees);
  }, [searchTerm, employees]); // Dependencies for useEffect

  return (
    <ActivateWrap>
      <div className="wrapper">
        <ButtonTable
          columns={employeesCols}
          data={filteredActiveEmployees}
          border
          // coloredColumnKey="Status"
          // color="green"
        />
      </div>
    </ActivateWrap>
  );
};

export default ActivateEmployee;
