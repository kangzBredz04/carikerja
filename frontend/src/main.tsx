import React from "react";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import RegisterForm from "./pages/job_seeker/RegisterForm.tsx";
import LoginForm from "./pages/job_seeker/LoginForm.tsx";
import JobListWithoutLogin from "./pages/JobListWithoutLogin.tsx";
import CompanyList from "./pages/CompanyList.tsx";

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
        path: "/job-list",
        element: <JobListWithoutLogin />,
      },
      {
        path: "/company-list",
        element: <CompanyList />,
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
