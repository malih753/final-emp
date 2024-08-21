import React, { useState } from "react";
import { ForumWrap } from "./Forum.styles";
import FeedCard from "./FeedCard";
import AnonymousHeader from "./AnonymousHeader";

const AnonymousForums = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query

  return (
    <ForumWrap>
      <AnonymousHeader setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery as prop */}
      <FeedCard searchQuery={searchQuery} /> {/* Pass searchQuery as prop */}
    </ForumWrap>
  );
};

export default AnonymousForums;
