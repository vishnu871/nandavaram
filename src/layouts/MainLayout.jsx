
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

function MainLayout() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/about";

  // Real authentication will be connected in a later stage.
  const isAuthenticated = false;

  return (
    <div className="main-layout">
      {!hideNavbar && (
        <Navbar isAuthenticated={isAuthenticated} />
      )}

      <main className="main-layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
