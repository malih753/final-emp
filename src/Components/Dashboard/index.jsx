import React, { useEffect, useState } from "react";
import { DashboardWrap } from "./Dashboard.styles";
import AnalysisSession from "./AnalysisSession";
import AnonymousHome from "./AnonymousHome";
import CoachFeedback from "./CoachFeedback";
import AnonymousReported from "./AnonymousReported";
import { serverDomain } from "../../Constants/serverDomain";
import { useAuth } from "../Context/Context";
import { data } from "../Sidebar/data";
const Dashboard = () => {
  const { companyId } = useAuth();

  const [stats, setStats] = useState({});
  const [anonymouslyReportedPost, setAnonymouslyReportedPost] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${serverDomain}/dashboard/company/${companyId}?startDate=2024-01-01&endDate=2024-08-30&forumStartDate=2024-01-01&forumEndDate=2024-08-30&empStartDate=2024-01-01&empEndDate=2024-08-30`
        );

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        console.log(data);
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const res = await fetch(
          `${serverDomain}/forum/anonymouslyPost.reports/${companyId}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        console.log(data);

        console.log("anonymusReportedPost", data);
        setAnonymouslyReportedPost(data.forums);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <DashboardWrap>
      <AnalysisSession analysis={stats} />
      <AnonymousHome data={stats} />
      <CoachFeedback />
      <AnonymousReported anonymouslyReportedPost={anonymouslyReportedPost}/>
    </DashboardWrap>
  );
};

export default Dashboard;
