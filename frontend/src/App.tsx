import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import { api } from "./utils";

// Define a type for the context
interface AllContextType {
  userId: number | null;
}

// Provide a default value
const defaultContextValue: AllContextType = {
  userId: null,
};

// Create the context with the correct type
export const AllContext = createContext<AllContextType>(defaultContextValue);

function App() {
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    api.get("/job-seekers").then((response) => {
      const data = response.filter(
        (res) => res.user.email == localStorage.getItem("email")
      );
      if (data && data.length > 0) {
        setUserId(data[0].id);
      }
    });
  }, [userId]);

  return (
    <AllContext.Provider
      value={{
        userId,
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </AllContext.Provider>
  );
}

export default App;
