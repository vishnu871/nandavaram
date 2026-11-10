
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

function MainLayout() {
  // Real authentication will be connected in a later stage.
  const isAuthenticated = false;

  return (
    <div className="main-layout">
      <Navbar isAuthenticated={isAuthenticated} />

      <main className="main-layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
