import React, { useState, useEffect } from "react";
import { AllEmployeeWrap } from "./AllEmployee.styles";
import ButtonTable from "../TableButton";
import Modal from "../../Modal";
import { useAuth } from "../../Context/Context";
import { useOutletContext } from "react-router-dom";
import { employeesCols } from "../EmployeeData";

const AllEmployee = () => {
  const [reason, setReason] = useState(false);
  const [toldReason, setToldReason] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { employees, setEmployees } = useAuth();
  const [buttonId, setButtonId] = useState("");
  const { searchQuery } = useOutletContext(); // Retrieve search query from outlet context

  const handleButtonClick = (btnId) => {
    setButtonId(btnId);
    setReason(false);
    setToldReason(true);
  };

  const handleSaveReason = () => {
    const newEmployees = employees.map((e) => {
      const button = e.Status.buttons.find((btn) => btn.id === buttonId);
      if (button) {
        return {
          ...e,
          Status: {
            ...e.Status,
            buttons: e.Status.buttons.map((btn) =>
              btn.id === buttonId
                ? { ...btn, text: "Deactivate", color: "red" }
                : btn
            ),
          },
        };
      }
      return e;
    });

    setEmployees(newEmployees);
    setToldReason(false);
    setReason(false);
  };

  useEffect(() => {
    if (searchQuery) {
      setFilteredEmployees(
        employees.filter((employee) =>
          employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchQuery, employees]);

  return (
    <AllEmployeeWrap>
      <div className="wrapper">
        <ButtonTable
          columns={employeesCols}
          data={filteredEmployees}
          border
          onButtonClick={handleButtonClick}
          onImageClick={(avatar) => console.log("Image clicked:", avatar)}
        />
      </div>
      {reason && (
        <Modal open={reason} setOpen={setReason} width="612px">
          <div className="reasonwrap">
            <strong>Reason for Deactivation</strong>
            <textarea value={deactivateReason} readOnly />
          </div>
        </Modal>
      )}
      {toldReason && (
        <Modal open={toldReason} setOpen={setToldReason} width="612px">
          <div className="reasonwrap">
            <strong>Enter Reason for Deactivation</strong>
            <textarea
              value={deactivateReason}
              onChange={(e) => setDeactivateReason(e.target.value)}
            />
            <button onClick={handleSaveReason}>Save</button>
          </div>
        </Modal>
      )}
    </AllEmployeeWrap>
  );
};

export default AllEmployee;
