import React, { useEffect, useState } from "react";
import { useSearch } from "../../SearchContext"; // Import search context
import Table from "../../Table";
import { ActiveInActiveCol, ActiveInActiveData } from "../ReportData";
import { useAuth } from "../../Context/Context";
import { serverDomain } from "../../../Constants/serverDomain";

const ActiveInActive = () => {
  const { searchTerm } = useSearch(); // Access search term from context
  const { companyId } = useAuth();
  const [data, setData] = useState([]);

  // Ensure searchTerm is a string and provide fallback if undefined
  const safeSearchTerm = searchTerm || "";

  // Filter data based on searchTerm
  const filteredData = data.filter((item) => {
    // Assuming `item.name` is the property you're searching against
    const name = item.Name || ""; // Fallback to empty string if name is undefined
    return name.toLowerCase().includes(safeSearchTerm.toLowerCase());
  });


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${serverDomain}/reports/company/${companyId}`);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        console.log(data);
        const transformedData = data.employees.map((e) => ({
          checkbox: <input type="checkbox" />,
          Name: e.firstName + e.lastName,
          Designation: e.designation,
          Contact: e.phone,
          MailID: e.personalEmail,
          LastActive: e.status,
        }));

        setData(transformedData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="wrapper">
        <strong className="title">Active/Inactive Employee</strong>
        {filteredData.length > 0 ? (
          <Table columns={ActiveInActiveCol} data={filteredData} border={true} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default ActiveInActive;
