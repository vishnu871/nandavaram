
import { useEffect, useState } from "react";
import {
  NavLink,
  Link,
} from "react-router-dom";
import {
  Menu,
  X,
  Landmark,
  UserRound,
  LogOut,
} from "lucide-react";

import { useLanguage } from "../../context/useLanguage.js";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

import "./Navbar.css";

function Navbar({
  isAuthenticated = false,
  onSignOut,
}) {
  const { translations } = useLanguage();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navigationLinks = [
    {
      label: translations.common.home,
      path: "/",
    },
    {
      label: translations.common.about,
      path: "/about",
    },
    {
      label: translations.common.mediaArchive,
      path: "/media-archive",
    },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="temple-navbar-wrapper">
      <nav
        className="temple-navbar"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="temple-navbar__brand"
          onClick={closeMobileMenu}
          aria-label={translations.navbar.templeName}
        >
          <span className="temple-navbar__logo">
            <Landmark size={25} strokeWidth={1.7} />
          </span>

          <span className="temple-navbar__brand-text">
            <span className="temple-navbar__temple-name">
              {translations.navbar.templeName}
            </span>

            <span className="temple-navbar__location">
              {translations.navbar.location}
            </span>
          </span>
        </Link>

        <div className="temple-navbar__navigation">
          {navigationLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `temple-navbar__link ${
                  isActive ? "is-active" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="temple-navbar__actions">
          <LanguageSwitcher />

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="temple-navbar__profile"
                aria-label={translations.common.profile}
                title={translations.common.profile}
              >
                <UserRound size={19} />
              </Link>

              <button
                type="button"
                className="temple-navbar__signout"
                onClick={onSignOut}
                disabled={!onSignOut}
              >
                <LogOut size={16} />
                <span>{translations.common.signOut}</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="temple-navbar__get-started"
            >
              {translations.common.getStarted}
            </Link>
          )}
        </div>

        <button
          type="button"
          className="temple-navbar__mobile-toggle"
          onClick={() =>
            setIsMobileMenuOpen((previous) => !previous)
          }
          aria-label={
            isMobileMenuOpen
              ? translations.common.close
              : translations.common.menu
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="temple-mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>
      </nav>

      <div
        id="temple-mobile-navigation"
        className={`temple-navbar__mobile-panel ${
          isMobileMenuOpen ? "is-open" : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
      >
        <div className="temple-navbar__mobile-links">
          {navigationLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `temple-navbar__mobile-link ${
                  isActive ? "is-active" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="temple-navbar__mobile-actions">
          <LanguageSwitcher />

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="temple-navbar__mobile-action"
                onClick={closeMobileMenu}
              >
                <UserRound size={18} />
                {translations.common.profile}
              </Link>

              <button
                type="button"
                className="temple-navbar__mobile-action"
                onClick={() => {
                  closeMobileMenu();
                  onSignOut?.();
                }}
                disabled={!onSignOut}
              >
                <LogOut size={18} />
                {translations.common.signOut}
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="temple-navbar__get-started temple-navbar__mobile-get-started"
              onClick={closeMobileMenu}
            >
              {translations.common.getStarted}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

