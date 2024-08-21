import React, { useEffect, useState } from "react";
import { useSearch } from "../../SearchContext"; // Import your search context
import Table from "../../Table";
import { AnonymousCol, AnonymousData } from "../ReportData";
import { AnonymousWrap } from "./anonymous.styles";
import { useAuth } from "../../Context/Context";
import { serverDomain } from "../../../Constants/serverDomain";

const AnonymousForum = () => {
  const { searchTerm } = useSearch(); // Use the search context
  const [data, setData] = useState([]);
  // Ensure searchTerm is a string and provide fallback if undefined
  const safeSearchTerm = searchTerm || "";

  // Filter data based on searchTerm
  const filteredData = data.filter((item) => {
    // Assuming `item.name` is the property you're searching against
    const name = item.TypeofForum || ""; // Fallback to empty string if name is undefined
    return name.toLowerCase().includes(safeSearchTerm.toLowerCase());
  });

  const { companyId } = useAuth();



  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${serverDomain}/reports/company/${companyId}`);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        console.log(data);
        const transformedData = [
          {
            TypeofForum: "Discussion",
            NumberofPost: data.anonymousForum.numberOfDiscussion,
          },
          {
            TypeofForum: "Post",
            NumberofPost: data.anonymousForum.numberOfQuestions,
          },
          {
            TypeofForum: "Poll",
            NumberofPost: data.anonymousForum.numberOfPolls,
          },
        ];
        setData(transformedData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <AnonymousWrap>
      <div className="wrapper">
        <strong className="title">Anonymous Forum</strong>
        {filteredData.length > 0 ? (
          <Table columns={AnonymousCol} data={filteredData} border={true} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </AnonymousWrap>
  );
};

export default AnonymousForum;
