import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  const loginUpdate = () => {
    const token = localStorage.getItem('token');
    setLogin(!!token);
  };
  
  return (
    <AuthContext.Provider value={{ login, loginUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };