import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false); // Default to false
  const [isAdmin, setIsAdmin] = useState(false); // Default to false
  console.log("Initial State - isLogged:", isLogged, "isAdmin:", isAdmin);
  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, isAdmin, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
