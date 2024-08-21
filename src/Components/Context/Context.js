import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [companyId, setCompanyId] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [calenderSession, setCalenderSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
console.log("fasiha rehmat ali", calenderSession)
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        user,
        setUser,
        companyId,
        setCompanyId,
        employees,
        setEmployees,
        search,
        setSearch,
        calenderSession,
        setCalenderSession,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
