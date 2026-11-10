
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  CalendarDays,
  Ticket,
  Images,
  Flame,
  BellRing,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../../context/useLanguage.js";

import "./Home.css";

const services = [
  {
    icon: Heart,
    title: "Donations",
    teluguTitle: "విరాళాలు",
    description: "Support temple activities and sacred initiatives.",
    teluguDescription: "ఆలయ కార్యక్రమాలు మరియు సేవలకు మీ వంతు సహకారం అందించండి.",
    path: "/donations",
    number: "01",
  },
  {
    icon: Ticket,
    title: "Darshan Tickets",
    teluguTitle: "దర్శన టికెట్లు",
    description: "Explore darshan booking information and services.",
    teluguDescription: "దర్శన బుకింగ్ సమాచారం మరియు సేవలను తెలుసుకోండి.",
    path: "/darshan-booking",
    number: "02",
  },
  {
    icon: CalendarDays,
    title: "Darshan Updates",
    teluguTitle: "దర్శన సమాచారం",
    description: "Stay informed about important temple announcements.",
    teluguDescription: "ఆలయ ముఖ్యమైన ప్రకటనలు మరియు తాజా సమాచారాన్ని తెలుసుకోండి.",
    path: "/events",
    number: "03",
  },
  {
    icon: Images,
    title: "Events",
    teluguTitle: "ఉత్సవాలు",
    description: "Discover temple festivals and celebrations.",
    teluguDescription: "ఆలయ పండుగలు మరియు వేడుకల వివరాలను తెలుసుకోండి.",
    path: "/events",
    number: "04",
  },
];

const serviceContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const serviceItem = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedWords({ children }) {
  return (
    <span className="home-animated-words">
      {children.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="home-animated-word"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{
            duration: 0.45,
            delay: index * 0.07,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function Home() {
  const { language } = useLanguage();
  const isTelugu = language === "te";

  return (
    <main className="home-page">
      {/* SECTION 1 — TEMPLE INTRODUCTION */}

      <section className="home-intro">
        <div className="home-intro__video-placeholder">
          <div className="home-intro__overlay" />

          <motion.div
            className="home-intro__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              className="home-intro__eyebrow"
              initial={{ opacity: 0, letterSpacing: "8px" }}
              animate={{ opacity: 1, letterSpacing: "3px" }}
              transition={{ duration: 1.2 }}
            >
              {isTelugu
                ? "శ్రీ చౌడేశ్వరి దేవి ఆలయం"
                : "A Sacred Destination"}
            </motion.span>

            <h1>
              {isTelugu
                ? "నందవరం శ్రీ చౌడేశ్వరి దేవి ఆలయం"
                : "Sri Chowdeswari Devi Temple"}
            </h1>

            <p>
              {isTelugu
                ? "నందవరం, ఆంధ్రప్రదేశ్"
                : "Nandavaram, Andhra Pradesh"}
            </p>

            <Link to="/about" className="home-intro__button">
              {isTelugu ? "ఆలయం గురించి" : "Discover the Temple"}
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          <span className="home-intro__location">
            NANDAVARAM · ANDHRA PRADESH
          </span>
        </div>
      </section>

      {/* SECTION 2 — PILGRIM SERVICES */}

      <section className="home-services">
        <motion.div
          className="home-section-heading home-services__heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={serviceContainer}
        >
          <motion.span
            className="home-section-heading__eyebrow"
            variants={serviceItem}
          >
            {isTelugu ? "భక్తుల సౌకర్యార్థం" : "HERE TO SERVE DEVOTEES"}
          </motion.span>

          <motion.h2 variants={serviceItem}>
            <AnimatedWords>
              {isTelugu ? "భక్తుల సేవలు" : "Everything for Your Visit"}
            </AnimatedWords>
          </motion.h2>

          <motion.p variants={serviceItem}>
            {isTelugu
              ? "మీ ఆలయ సందర్శనకు అవసరమైన సేవలు మరియు సమాచారం ఒకే చోట."
              : "Thoughtfully organised temple services and essential information, all in one place."}
          </motion.p>

          <motion.div
            className="home-services__decorative-line"
            variants={serviceItem}
          >
            <span />
            <span className="home-services__decorative-symbol">✦</span>
            <span />
          </motion.div>
        </motion.div>

        <motion.div
          className="home-services__grid"
          variants={serviceContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.number}
                className="home-service-card"
                variants={serviceItem}
                whileHover={{ y: -7 }}
              >
                <span className="home-service-card__number">
                  {service.number}
                </span>

                <span className="home-service-card__icon">
                  <Icon size={25} strokeWidth={1.7} />
                </span>

                <h3>
                  {isTelugu ? service.teluguTitle : service.title}
                </h3>

                <p>
                  {isTelugu
                    ? service.teluguDescription
                    : service.description}
                </p>

                <Link
                  to={service.path}
                  className="home-service-card__link"
                >
                  {isTelugu ? "మరింత తెలుసుకోండి" : "Explore Service"}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* SECTION 3 — ABOUT NANDAVARAM */}

      <section className="home-about">
        <motion.div
          className="home-about__content"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
        >
          <span className="home-section-heading__eyebrow">
            {isTelugu ? "మన ఆధ్యాత్మిక వారసత్వం" : "OUR HERITAGE"}
          </span>

          <h2>
            {isTelugu
              ? "నందవరం ఆధ్యాత్మిక వైభవం"
              : "Discover the Spiritual Heritage of Nandavaram"}
          </h2>

          <p>
            {isTelugu
              ? "శ్రీ చౌడేశ్వరి దేవి ఆలయం యొక్క ఆధ్యాత్మిక ప్రాముఖ్యత, సంప్రదాయాలు మరియు చరిత్ర గురించి తెలుసుకోండి."
              : "Explore the spiritual significance, traditions and heritage associated with Sri Chowdeswari Devi Temple at Nandavaram."}
          </p>

          <Link to="/about" className="home-text-link">
            {isTelugu ? "మరింత చదవండి" : "Read More"}
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <motion.div
          className="home-about__visual"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="home-about__visual-inner">
            <span>॥ శ్రీ మాతే నమః ॥</span>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4 — MEDIA ARCHIVE */}

      <section className="home-media">
        <div className="home-section-heading">
          <span className="home-section-heading__eyebrow">
            {isTelugu ? "ఆలయ జ్ఞాపకాలు" : "TEMPLE MOMENTS"}
          </span>

          <h2>
            {isTelugu ? "మీడియా ఆర్కైవ్" : "Moments of Devotion"}
          </h2>

          <p>
            {isTelugu
              ? "ఆలయ ఫోటోలు, వీడియోలు మరియు ఉత్సవాల జ్ఞాపకాలు."
              : "Explore temple photographs, videos and festival celebrations."}
          </p>
        </div>

        <div className="home-media__placeholder">
          <Images size={34} strokeWidth={1.4} />

          <p>
            {isTelugu
              ? "ఆలయ ఫోటోలు మరియు వీడియోలు త్వరలో ఇక్కడ అందుబాటులో ఉంటాయి."
              : "Temple photographs and videos will appear here."}
          </p>
        </div>

        <Link to="/media-archive" className="home-text-link">
          {isTelugu ? "మీడియా ఆర్కైవ్ చూడండి" : "Explore Media Archive"}
          <ArrowRight size={17} />
        </Link>
      </section>

      {/* SECTION 5 — UPCOMING UTSAVS */}

      <section className="home-utsavs">
        <div className="home-section-heading">
          <span className="home-section-heading__eyebrow">
            {isTelugu ? "దైవిక వేడుకలు" : "TEMPLE CELEBRATIONS"}
          </span>

          <h2>
            {isTelugu ? "రాబోయే ఉత్సవాలు" : "Upcoming Utsavs"}
          </h2>

          <p>
            {isTelugu
              ? "ఆలయ ఉత్సవాలు మరియు ప్రత్యేక కార్యక్రమాల సమాచారం."
              : "Stay connected with temple festivals and sacred celebrations."}
          </p>
        </div>

        <div className="home-utsavs__grid">
          <motion.article
            className="home-utsav-card home-utsav-card--featured"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <div className="home-utsav-card__artwork">
              <div className="home-utsav-card__halo" />

              <Flame
                className="home-utsav-card__flame"
                size={76}
                strokeWidth={1.2}
              />

              <span className="home-utsav-card__sacred-text">
                ॥ శ్రీ మాతే నమః ॥
              </span>
            </div>

            <div className="home-utsav-card__content">
              <span className="home-utsav-card__eyebrow">
                {isTelugu ? "ప్రత్యేక ఆలయ ఉత్సవం" : "TEMPLE FESTIVAL"}
              </span>

              <h3>
                {isTelugu ? "జ్యోతి ఉత్సవం" : "Jyothi Utsav"}
              </h3>

              <p>
                {isTelugu
                  ? "జ్యోతి ఉత్సవానికి సంబంధించిన తేదీలు మరియు కార్యక్రమాల వివరాలు ఆలయ కమిటీ ద్వారా ప్రకటించబడతాయి."
                  : "Celebrate the spirit of Jyothi Utsav. Official dates and programme details will be announced by the temple committee."}
              </p>

              <div className="home-utsav-card__meta">
                <CalendarDays size={17} />
                <span>
                  {isTelugu
                    ? "తేదీలు త్వరలో ప్రకటించబడతాయి"
                    : "Dates to be announced"}
                </span>
              </div>

              <Link to="/events" className="home-utsav-card__link">
                {isTelugu ? "ఉత్సవాల వివరాలు" : "View Event Updates"}
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.article>

          <motion.article
            className="home-utsav-card home-utsav-card--announcement"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <div className="home-utsav-card__announcement-icon">
              <BellRing size={34} strokeWidth={1.5} />
            </div>

            <div className="home-utsav-card__content">
              <span className="home-utsav-card__eyebrow">
                {isTelugu ? "ఆలయ ప్రకటనలు" : "TEMPLE ANNOUNCEMENTS"}
              </span>

              <h3>
                {isTelugu ? "తాజా ఉత్సవ సమాచారం" : "Festival Updates"}
              </h3>

              <p>
                {isTelugu
                  ? "ఆలయ కమిటీ అధికారికంగా ప్రకటించిన ఇతర ఉత్సవాలు మరియు కార్యక్రమాల వివరాలు ఇక్కడ అందుబాటులో ఉంటాయి."
                  : "Official announcements about other temple festivals and programmes will be shared here as they are confirmed."}
              </p>

              <div className="home-utsav-card__meta">
                <CalendarDays size={17} />
                <span>
                  {isTelugu
                    ? "అధికారిక ప్రకటనల కోసం చూడండి"
                    : "Awaiting official announcements"}
                </span>
              </div>

              <Link to="/events" className="home-utsav-card__link">
                {isTelugu ? "అన్ని ప్రకటనలు" : "View All Updates"}
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </main>
  );
}

export default Home;
