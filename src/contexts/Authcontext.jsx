import React, { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  userName: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "signUp":
      return { ...state, userName: action.payload.userName };
    case "signOut":
      return { ...state, userName: null };

    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const userDetails = async () => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      dispatch({ type: "signUp", payload: { userName } });
    }
  };

  useEffect(() => {
    userDetails();
  }, [!state]);

  return (
    <AuthContext.Provider value={{ Authstate: state, Authdispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
