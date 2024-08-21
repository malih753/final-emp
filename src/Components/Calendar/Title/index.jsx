import React from "react";
import { TitleWrap } from "./Title.styles";
import people from "../../../assets/session/people.png";
import person from "../../../assets/session/peoples.png";
import { FaPencilAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Title = ({user, title}) => {
  console.log(title, user, "fffff")
  return (
    <TitleWrap>
      <span>{title}</span>
      <span>
        <img src={people} alt="people" />
        {user}
      </span>
      <span>
        <FaPencilAlt />
        <div className="preview">
          <FaEye />
        </div>
      </span>
    </TitleWrap>
  );
};

export default Title;

export const ManageTitle = () => {
  return (
    <TitleWrap>
      <span>Change Management: Leading Agile Systems Change...</span>
      <span>
        <img src={person} alt="person" />
        Anish Mehra, Junior Engineer
      </span>
      <span>
        <FaPencilAlt />
        <FaEye />
      </span>
    </TitleWrap>
  );
};