import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderEmpolye from "../../components/HeaderEmploye";
import { createContext, useEffect, useState } from "react";
import { api } from "../../utils";
import { Job } from "../../types/Job";

export const EmployeContext = createContext({});

export default function Employe() {
  const [jobs, setJobs] = useState<Job[]>();
  const [employeId, setEmployeId] = useState<number | null>(0);
  useEffect(() => {
    api.get("/employers").then((response) => {
      const data = response.filter(
        (res) => res.user.email == localStorage.getItem("email")
      );
      setEmployeId(data[0].id);
    });
  }, [employeId]);

  useEffect(() => {
    // Ambil data loker
    api.get("/jobs").then((res) => setJobs(res as Job[]));
  }, []);

  return (
    <EmployeContext.Provider value={{ jobs, setJobs, employeId, setEmployeId }}>
      <HeaderEmpolye />
      <Outlet />
      <Footer />
    </EmployeContext.Provider>
  );
}
