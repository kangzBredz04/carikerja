import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderEmpolye from "../../components/HeaderEmploye";

export default function Employe() {
  return (
    <>
      <HeaderEmpolye />
      <Outlet />
      <Footer />
    </>
  );
}
