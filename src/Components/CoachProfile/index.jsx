import React, { useEffect, useState } from "react";
import { CoachWrap } from "./Caoch.styles";
import SearchBar from "../TextField/SearchBar";
import Profile from "./profile";
import { useAuth } from "../Context/Context";
import { serverDomain } from "../../Constants/serverDomain";

const CoachProfile = () => {
  const [coachProfiles, setCoachProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const getCoachProfiles = async () => {
    try {
      const response = await fetch(`${serverDomain}/home`);
      const data = await response.json();
      console.log("API Response Data:", data);
      setCoachProfiles(data.data.coachProfiles);
      console.log(data);
    } catch (error) {
      console.log("Error fetching coach profiles:", error);
    }
  };

  useEffect(() => {
    getCoachProfiles();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <CoachWrap>
      <div className="searchbar">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
      </div>
      <div className="profile">
        <Profile coachProfiles={coachProfiles} searchQuery={searchQuery} />
      </div>
    </CoachWrap>
  );
};

export default CoachProfile;
