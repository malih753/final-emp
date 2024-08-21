import React, { useEffect, useState } from "react";
import { DeactivateWrap } from "./Deactivate.styles";
import ButtonTable from "../TableButton";
import { employeesCols } from "../EmployeeData";
import { useAuth } from "../../Context/Context";
import { useSearch } from "../../SearchContext";

const DeactivateEmployee = () => {
  const { employees } = useAuth();
  const { searchTerm } = useSearch(); // Use the search term from context

  const [filteredDeactivatedEmployees, setFilteredDeactivatedEmployees] = useState([]);

  useEffect(() => {
    // Filter deactivated employees
    const deactivatedEmployees = employees.filter(
      (employee) => employee.Status.buttons[0].text === "Deactivate"
    );

    // Further filter based on searchTerm
    const filteredEmployees = deactivatedEmployees.filter((employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDeactivatedEmployees(filteredEmployees);
  }, [searchTerm, employees]); // Dependencies for useEffect

  return (
    <DeactivateWrap>
      <div className="wrapper">
        <ButtonTable
          columns={employeesCols}
          data={filteredDeactivatedEmployees}
          border
          // coloredColumnKey="Status"
          // color="green"
        />
      </div>
    </DeactivateWrap>
  );
};

export default DeactivateEmployee;
