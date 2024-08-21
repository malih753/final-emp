import React, { useEffect, useState } from "react";
import { SessionWrap } from "./Sessions.styles";
import SessionHeader from "./SessionHeader";
import UpcomingSession from "./UpcomingSession";
import { serverDomain } from "../../Constants/serverDomain";

const Sessions = () => {
  const [session, setSession] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${serverDomain}/session/all/fetch`);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        setSession(data.sessions);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <SessionWrap>
      <SessionHeader setSearchQuery={setSearchQuery} />
      <UpcomingSession sessions={session} searchQuery={searchQuery} />
      {/* <GroupSession />
      <CompletedSession /> */}
    </SessionWrap>
  );
};

export default Sessions;
