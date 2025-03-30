import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const StateContext = createContext();

export function StateProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, [user]);

  const value = {
    user,
    setUser,
    loading
  };

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
}
