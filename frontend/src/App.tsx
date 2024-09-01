import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import { api } from "./utils";

export const AllContext = createContext();

function App() {
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    api.get("/job-seekers").then((response) => {
      console.log(response);
      const data = response?.filter(
        (res) => res.email == localStorage.getItem("email")
      );
      setUserId(data[0].id);
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
