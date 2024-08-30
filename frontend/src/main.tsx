import React from "react";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import RegisterForm from "./pages/job_seeker/RegisterForm.tsx";
import LoginForm from "./pages/job_seeker/LoginForm.tsx";
import CompanyList from "./pages/CompanyList.tsx";
import JobList from "./pages/job_seeker/JobList.tsx";
import JobDetail from "./pages/job_seeker/JobDetail.tsx";
import ProfilePage from "./pages/job_seeker/Profile.tsx";
import Employe from "./pages/employer/Employe.tsx";
import Dashboard from "./pages/employer/Dashboard.tsx";
import RegisterFormEmploye from "./pages/employer/RegisterFormEmploye.tsx";
import LoginFormEmploye from "./pages/employer/LoginFormEmploye.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user/register",
        element: <RegisterForm />,
      },
      {
        path: "/user/login",
        element: <LoginForm />,
      },
      {
        path: "/user/profile",
        element: <ProfilePage />,
      },
      {
        path: "/job-list",
        element: <JobList />,
      },
      {
        path: "/job-list/job/:id",
        element: <JobDetail />,
      },
      {
        path: "/company-list",
        element: <CompanyList />,
      },
    ],
  },
  {
    path: "/employe",
    element: <Employe />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/employe/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/employe/register",
        element: <RegisterFormEmploye />,
      },
      {
        path: "/employe/login",
        element: <LoginFormEmploye />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
