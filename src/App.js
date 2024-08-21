import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./Components/adminLayout";
import AnonymousForums from "./Components/AnonymousForums";
import SignUp from "./Components/Auth";
import OTP from "./Components/Auth/OTP";
import Password from "./Components/Auth/Password";
import UploadProfile from "./Components/Auth/UploadProfile";
import Calendar from "./Components/Calendar";
import LectureSchedule from "./Components/Calendar/LectureSchedule";
import Employee from "./Components/Calendar/LectureSchedule/Employe";
import CoachProfile from "./Components/CoachProfile";
import CompanyProfile from "./Components/CompanyProfile";
import ForgetPass from "./Components/CompanyProfile/ChangePass/ForgetPass";
import SubscriptionDetail from "./Components/CompanyProfile/PlanDetail";
import Dashboard from "./Components/Dashboard";
import CardProgress from "./Components/Dashboard/CardProgress";
import EmployeeProfile from "./Components/EmployeeProfile";
import ActivateEmployee from "./Components/EmployeeProfile/ActivateEmployee";
import AllEmployee from "./Components/EmployeeProfile/AllEmployee";
import DeactivateEmployee from "./Components/EmployeeProfile/DeactivateEmployee";
import { GlobalStyles } from "./Components/Global.styles";
import MyProfile from "./Components/MyProfile";
import Reports from "./Components/Reports";
import ActiveInActive from "./Components/Reports/ActiveInactive";
import AnonymousForum from "./Components/Reports/AnonymousForum";
import CoachFeedback from "./Components/Reports/CoachFeedback";
import CoachReport from "./Components/Reports/CoachReport";
import SessionAnalysis from "./Components/Reports/SessionAnalysis";
import SessionFeedback from "./Components/Reports/SessionFeedback";
import SessionLayout from "./Components/SessionLayout";
import Sessions from "./Components/Sessions";
import ViewSession from "./Components/Sessions/VewSession";
import SupportSec from "./Components/Support";
import { serverDomain } from "./Constants/serverDomain";
import { useAuth } from "./Components/Context/Context";
import { SearchProvider } from "./Components/SearchContext";
import ProtectedRoute from "./Components/Context/ProtectedRoute";

const App = () => {
  const { companyId, setEmployees } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${serverDomain}/user/fetch/${companyId}`);
        const data = await response.json();
        setEmployees(
          data.users.map((user) => ({
            ...user,
            Status: {
              buttons: [
                {
                  text: user.status,
                  color: user.status === "Active" ? "green" : "red",
                  id: `deactivate_${user.id}`,
                },
              ],
            },
          }))
        );
        console.log("3 Employees", data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [companyId, setEmployees]);

  return (
    <SearchProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/password" element={<Password />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/UploadProfile" element={<UploadProfile />} />
          <Route path="/" element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/CardProgress" element={<CardProgress />} />
            <Route path="/EmployeeProfile" element={<EmployeeProfile />}>
              <Route path="/EmployeeProfile" element={<AllEmployee />} />
              <Route
                path="/EmployeeProfile/DeactivateEmployee"
                element={<DeactivateEmployee />}
              />
              <Route
                path="/EmployeeProfile/ActivateEmployee"
                element={<ActivateEmployee />}
              />
            </Route>
            <Route path="/CoachProfile" element={<CoachProfile />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/LectureSchedule" element={<LectureSchedule />} />
            <Route path="/Employee" element={<Employee />} />
            <Route path="/sessions/ViewSession" element={<ViewSession />} />
            <Route path="/AnonymousForums" element={<AnonymousForums />} />
            <Route path="/reports" element={<Reports />}>
              <Route index element={<SessionAnalysis />} />
              <Route
                path="/reports/Anonymousforum"
                element={<AnonymousForum />}
              />
              <Route path="/reports/CoachReport" element={<CoachReport />} />
              <Route
                path="/reports/SessionFeedback"
                element={<SessionFeedback />}
              />
              <Route
                path="/reports/CoachFeedback"
                element={<CoachFeedback />}
              />
              <Route
                path="/reports/ActiveInActive"
                element={<ActiveInActive />}
              />
            </Route>
            <Route path="/support" element={<SupportSec />} />
            <Route path="/CompanyProfile" element={<CompanyProfile />} />
            <Route
              path="/CompanyProfile/forgot-password"
              element={<ForgetPass />}
            />
            <Route
              path="/CompanyProfile/SubscriptionDetail"
              element={<SubscriptionDetail />}
            />
          </Route>
          <Route path="/SessionLayout" element={<SessionLayout />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;
