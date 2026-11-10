
import { Link } from "react-router-dom";
import {
  Landmark,
  MapPin,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";

import { useLanguage } from "../../context/useLanguage.js";

import "./Footer.css";

function Footer() {
  const { language } = useLanguage();
  const isTelugu = language === "te";

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      label: isTelugu ? "హోమ్" : "Home",
      path: "/",
    },
    {
      label: isTelugu ? "ఆలయం గురించి" : "About the Temple",
      path: "/about",
    },
    {
      label: isTelugu ? "మీడియా ఆర్కైవ్" : "Media Archive",
      path: "/media-archive",
    },
    {
      label: isTelugu ? "ఉత్సవాలు" : "Events",
      path: "/events",
    },
  ];

  const devoteeLinks = [
    {
      label: isTelugu ? "దర్శన టికెట్లు" : "Darshan Tickets",
      path: "/darshan-booking",
    },
    {
      label: isTelugu ? "విరాళాలు" : "Donations",
      path: "/donations",
    },
    {
      label: isTelugu ? "నా ప్రొఫైల్" : "My Profile",
      path: "/profile",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="temple-footer">

      {/* Decorative top border */}

      <div className="temple-footer__top-border" />

      <div className="temple-footer__main">

        {/* Temple identity */}

        <div className="temple-footer__brand">
          <Link
            to="/"
            className="temple-footer__brand-link"
            aria-label="Sri Chowdeswari Devi Temple Home"
          >
            <span className="temple-footer__logo">
              <Landmark size={29} strokeWidth={1.5} />
            </span>

            <span className="temple-footer__brand-name">
              <strong>
                {isTelugu
                  ? "శ్రీ చౌడేశ్వరి దేవి ఆలయం"
                  : "Sri Chowdeswari Devi Temple"}
              </strong>

              <span>
                {isTelugu
                  ? "నందవరం, ఆంధ్రప్రదేశ్"
                  : "Nandavaram, Andhra Pradesh"}
              </span>
            </span>
          </Link>

          <p className="temple-footer__description">
            {isTelugu
              ? "శ్రీ చౌడేశ్వరి దేవి ఆలయ అధికారిక వెబ్‌సైట్. భక్తులకు ఆలయ సమాచారం, సేవలు మరియు ఉత్సవాల వివరాలను అందించడానికి రూపొందించబడింది."
              : "The official website of Sri Chowdeswari Devi Temple, providing devotees with temple information, services and festival updates."}
          </p>

          <div className="temple-footer__location">
            <MapPin size={18} />

            <span>
              Nandavaram, Banaganapalle Mandal,
              Nandyal District, Andhra Pradesh, India
            </span>
          </div>
        </div>

        {/* Quick navigation */}

        <div className="temple-footer__column">
          <h3>
            {isTelugu ? "ముఖ్యమైన లింకులు" : "Explore"}
          </h3>

          <ul>
            {quickLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  {item.label}
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Devotee services */}

        <div className="temple-footer__column">
          <h3>
            {isTelugu ? "భక్తుల సేవలు" : "Devotee Services"}
          </h3>

          <ul>
            {devoteeLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  {item.label}
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer bottom */}

      <div className="temple-footer__bottom">
        <p>
          © {currentYear} Sri Chowdeswari Devi Temple Committee.
          {isTelugu
            ? " అన్ని హక్కులు ప్రత్యేకించబడ్డాయి."
            : " All rights reserved."}
        </p>

        <button
          type="button"
          className="temple-footer__back-to-top"
          onClick={scrollToTop}
        >
          {isTelugu ? "పైకి వెళ్లండి" : "Back to Top"}
          <ArrowUp size={16} />
        </button>
      </div>

    </footer>
  );
}

export default Footer;
