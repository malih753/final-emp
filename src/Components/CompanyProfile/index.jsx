import React, { useEffect, useState } from "react";
import {
  CompanyWrapper,
  Tables,
  TableData,
  TableHeader,
  TableRow,
} from "./CompanyProfile.styles";
import BG from "../../assets/companyprofile/BG.png";
import logo from "../../assets/companyprofile/logo.png";
import nexxt from "../../assets/companyprofile/nexxt.png";
import backarrow from "../../assets/support/backArrow.png";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePass";
import Table from "../Table";
import { serverDomain } from "../../Constants/serverDomain";
import { useAuth } from "../Context/Context";
const CompanyProfile = () => {
  const [profile, setProfile] = useState({});
  const { companyId, email, user } = useAuth();

  const columns = [
    { key: "planName", header: "Plan Name/Type" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    {
      key: "viewDetails",
      header: "View Details",
      render: (data, row) => (
        <img
          src={data}
          alt="next icon"
          onClick={() => handleImageClick(row)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  const data = [
    {
      planName: "Gold",
      startDate: "01 Jan 2024",
      endDate: "01 Jan 2025",
      viewDetails: { image: nexxt },
    },
  ];
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate("/CompanyProfile/SubscriptionDetail");
  };

  const backToPage = () => {
    navigate("/Dashboard");
  };
  const [bgImage, setBgImage] = useState(BG);
  const [logoImage, setLogoImage] = useState(logo);

  const handleBgImageChange = (event) => {
    if (event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      setBgImage(newImage);
    }
  };

  const handleLogoImageChange = (event) => {
    if (event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      setLogoImage(newImage);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${serverDomain}/user/${user}`);
        const data = await res.json();
        console.log("coach profile", data);
        setProfile(data.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <CompanyWrapper>
      <div className="profile">
        <div className="arrow" onClick={backToPage}>
          <img src={backarrow} alt="arrow" />
        </div>
        <div
          className="bgimg"
          onClick={() => document.getElementById("bgImageInput").click()}
        >
          <img src={bgImage} alt="bgimg" />
          <input
            type="file"
            id="bgImageInput"
            style={{ display: "none" }}
            onChange={handleBgImageChange}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <div
          className="logo"
          onClick={() => document.getElementById("logoInput").click()}
        >
          <img src={logoImage} alt="logo" />
          <input
            type="file"
            id="logoInput"
            style={{ display: "none" }}
            onChange={handleLogoImageChange}
            accept=".jpg, .jpeg, .png"
          />
        </div>
      </div>
      <div className="InfosysLimited">
        <div className="wrapper">
          <span className="h1">
            {profile?.firstName + " " + profile.lastName}
          </span>
          <ul className="listed">
            <li>Hinjewadi Phase II, Pune, Maharashtra</li>
            <li>{profile?.corporateEmail}</li>
            <li>Contact No: {profile?.phone}</li>
            <li>
              Concern Person: {profile?.firstName + " " + profile.lastName}
            </li>
            {/* <li>Email ID: abhishekinfy4@gmail.com</li>
            <li>Contact No: +91 9845876980</li> */}
          </ul>
        </div>
      </div>
      <div className="about">
        <div className="wrapper">
          <span className="h2">
            About {profile?.firstName + " " + profile.lastName}
          </span>
          <p>{profile?.bio}</p>
        </div>
      </div>
      <div className="Subscription">
        <div className="wrapper">
          <span className="h2">Subscriptions</span>
          <Table
            columns={columns}
            data={data}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
      <div className="changepass">
        <ChangePassword />
      </div>
    </CompanyWrapper>
  );
};

export default CompanyProfile;
