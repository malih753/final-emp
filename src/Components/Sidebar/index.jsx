import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarWrap } from "./Sidebar.styles";
import { data } from "./data";
import { useSearch } from "../SearchContext";

const Sidebar = () => {
  const { pathname } = useLocation(); // Get the current path
  const { setSearchTerm } = useSearch(); // Get the function to update search term

  useEffect(() => {
    // Reset search term whenever the path changes
    setSearchTerm("");
  }, [pathname, setSearchTerm]);

  return (
    <SidebarWrap>
      <div className="sidebarHolder">
        <ul>
          {data.map((val, ind) => (
            <li key={ind}>
              <NavLink to={val.link} activeClassName="active">
                {/* <img src={val.img} alt="images" /> */}{val.icon}
                {val.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </SidebarWrap>
  );
};

export default Sidebar;
