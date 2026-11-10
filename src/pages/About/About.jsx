
import { motion } from "framer-motion";
import {
  BookOpen,
  Flame,
  Landmark,
  MapPin,
  Sparkle,
} from "lucide-react";
import { useLanguage } from "../../context/useLanguage.js";
import "./About.css";

const content = {
  en: {
    eyebrow: "OUR SACRED HERITAGE",
    title: "A place of faith,",
    titleAccent: "devotion and tradition",
    intro:
      "Nestled in the village of Nandavaram in Andhra Pradesh, the sacred shrine of Sri Chowdeswari Devi has long been a place of devotion for pilgrims and families who hold the Goddess close to their hearts.",
    locationTitle: "The village of Nandavaram",
    location:
      "Nandavaram is located in Banaganapalle Mandal of Nandyal District, Andhra Pradesh. The village is especially known for the Sri Chowdeswari Devi Temple, which draws devotees from the surrounding region and beyond.",
    templeTitle: "Sri Chowdeswari Devi Temple",
    temple:
      "The temple is dedicated to Sri Chowdeswari Devi, also revered in local tradition in connection with Kasi Vishalakshi. For generations, devotees have visited the shrine to offer prayers and seek the blessings of the Goddess.",
    legendEyebrow: "A TRADITION PASSED THROUGH GENERATIONS",
    legendTitle: "The story of King Nandana Chakravarthy",
    legend:
      "According to the traditional account associated with the temple, King Nandana Chakravarthy of Nandavaram had a deep devotion to the Divine Mother and a special connection with the sacred city of Kashi. The story tells of Brahmin families who sought the king’s help during a time of hardship. When they reminded him of a promise, the Goddess is believed to have accompanied them from Kashi to Nandavaram as a divine witness. This sacred account continues to be remembered by devotees and forms an important part of the temple’s spiritual heritage.",
    traditionNote:
      "This is a traditional religious account preserved through community belief and retelling; it is presented here as temple tradition rather than independently verified history.",
    significanceEyebrow: "A LIVING SPIRITUAL TRADITION",
    significanceTitle: "A place that brings devotees together",
    significance:
      "Sri Chowdeswari Devi is deeply revered by devotees and communities who regard the Goddess as their family or community deity. The temple continues to be a place for prayer, worship, cultural observances and shared devotion.",
    festivalTitle: "Jyothi Utsavam",
    festival:
      "The Nandyal District Administration identifies Jyothi Utsavam as an important celebration associated with Nandavaram, traditionally observed during Chaitra Masam, around March–April. The exact programme and dates may vary each year and should be confirmed through official temple announcements.",
    visitEyebrow: "PLAN YOUR VISIT",
    visitTitle: "Find your way to Nandavaram",
    visitText:
      "Nandavaram is in Banaganapalle Mandal, Nandyal District, Andhra Pradesh, India. The district administration lists the village approximately 9 km from Banaganapalle and 32 km from Nandyal.",
    sourceTitle: "Sources and further reading",
    sourceWikipedia: "Nandavaram — Wikipedia",
    sourceDistrict: "Nandyal District Administration — Places of Interest",
    sourceTourism: "Nandyal District Administration — Temple Tourism",
    closing: "May the blessings of Sri Chowdeswari Devi be with all devotees.",
    closingTelugu: "శ్రీ చౌడేశ్వరి దేవి ఆశీస్సులు భక్తులందరిపై ఉండాలని కోరుకుంటున్నాము.",
  },
  te: {
    eyebrow: "మన పవిత్ర వారసత్వం",
    title: "భక్తి, విశ్వాసం,",
    titleAccent: "సంప్రదాయాల నిలయం",
    intro:
      "ఆంధ్రప్రదేశ్‌లోని నందవరం గ్రామంలో వెలసిన శ్రీ చౌడేశ్వరి దేవి పవిత్ర ఆలయం, ఎన్నో తరాలుగా భక్తులకు ఆధ్యాత్మిక విశ్వాసానికి నిలయంగా ఉంది.",
    locationTitle: "నందవరం గ్రామం",
    location:
      "నందవరం ఆంధ్రప్రదేశ్‌లోని నంద్యాల జిల్లాలో, బనగానపల్లె మండలంలో ఉంది. ఈ గ్రామం శ్రీ చౌడేశ్వరి దేవి ఆలయం ద్వారా ప్రసిద్ధి చెందింది. చుట్టుపక్కల ప్రాంతాల నుంచే కాకుండా ఇతర ప్రాంతాల నుంచి కూడా భక్తులు అమ్మవారిని దర్శించుకుంటారు.",
    templeTitle: "శ్రీ చౌడేశ్వరి దేవి ఆలయం",
    temple:
      "ఈ ఆలయం శ్రీ చౌడేశ్వరి దేవికి అంకితం చేయబడింది. స్థానిక సంప్రదాయంలో అమ్మవారిని కాశీ విశాలాక్షితో కూడా అనుసంధానించి కొలుస్తారు. తరతరాలుగా భక్తులు అమ్మవారిని దర్శించుకుని ప్రార్థనలు సమర్పిస్తున్నారు.",
    legendEyebrow: "తరతరాలుగా వస్తున్న పవిత్ర గాథ",
    legendTitle: "నందన చక్రవర్తి కథ",
    legend:
      "ఆలయానికి సంబంధించిన సంప్రదాయ కథనం ప్రకారం, నందవరం పాలించిన నందన చక్రవర్తికి దైవమాతపై అపారమైన భక్తి ఉండేది. కాశీతో ఆయనకు ప్రత్యేకమైన ఆధ్యాత్మిక అనుబంధం ఉండేదని ఈ కథనం చెబుతుంది. కష్టకాలంలో సహాయం కోరిన బ్రాహ్మణ కుటుంబాలకు ఇచ్చిన మాటను గుర్తుచేసినప్పుడు, వారి ప్రార్థనకు స్పందించిన అమ్మవారు కాశీ నుంచి నందవరానికి వచ్చి సాక్షిగా నిలిచారని భక్తుల విశ్వాసం. ఈ పవిత్ర గాథ నేటికీ భక్తుల సంప్రదాయంలో నిలిచివుంది.",
    traditionNote:
      "ఇది భక్తుల విశ్వాసం మరియు తరతరాలుగా వస్తున్న ఆలయ సంప్రదాయ కథనం. దీనిని స్వతంత్రంగా నిర్ధారించబడిన చారిత్రక వాస్తవంగా కాకుండా పవిత్ర సంప్రదాయంగా అందిస్తున్నాము.",
    significanceEyebrow: "సజీవమైన ఆధ్యాత్మిక సంప్రదాయం",
    significanceTitle: "భక్తులను ఏకం చేసే పవిత్ర క్షేత్రం",
    significance:
      "శ్రీ చౌడేశ్వరి దేవిని అనేక కుటుంబాలు మరియు సమాజాలు తమ కులదైవంగా, ఆరాధ్య దైవంగా కొలుస్తాయి. ప్రార్థనలు, పూజలు, పండుగలు మరియు సామూహిక భక్తికి ఈ ఆలయం ఒక ముఖ్యమైన కేంద్రంగా కొనసాగుతోంది.",
    festivalTitle: "జ్యోతి ఉత్సవం",
    festival:
      "నంద్యాల జిల్లా అధికారిక సమాచారం ప్రకారం, నందవరంతో అనుబంధం ఉన్న ముఖ్యమైన ఉత్సవాలలో జ్యోతి ఉత్సవం ఒకటి. ఇది సంప్రదాయంగా చైత్ర మాసంలో, మార్చి–ఏప్రిల్ కాలంలో నిర్వహించబడుతుంది. ప్రతి సంవత్సరం ఖచ్చితమైన తేదీలు మరియు కార్యక్రమ వివరాలను ఆలయ అధికారిక ప్రకటనల ద్వారా నిర్ధారించుకోవాలి.",
    visitEyebrow: "మీ దర్శనాన్ని ప్లాన్ చేసుకోండి",
    visitTitle: "నందవరానికి మీ ప్రయాణం",
    visitText:
      "నందవరం ఆంధ్రప్రదేశ్‌లోని నంద్యాల జిల్లా, బనగానపల్లె మండలంలో ఉంది. జిల్లా అధికారిక సమాచారం ప్రకారం, ఈ గ్రామం బనగానపల్లెకు సుమారు 9 కి.మీ., నంద్యాలకు సుమారు 32 కి.మీ. దూరంలో ఉంది.",
    sourceTitle: "మూలాలు మరియు మరింత సమాచారం",
    sourceWikipedia: "నందవరం — వికీపీడియా",
    sourceDistrict: "నంద్యాల జిల్లా అధికారిక వెబ్‌సైట్ — దర్శనీయ స్థలాలు",
    sourceTourism: "నంద్యాల జిల్లా అధికారిక వెబ్‌సైట్ — ఆలయ పర్యాటకం",
    closing: "శ్రీ చౌడేశ్వరి దేవి ఆశీస్సులు భక్తులందరిపై ఉండాలని కోరుకుంటున్నాము.",
    closingTelugu: "శ్రీ చౌడేశ్వరి దేవి ఆశీస్సులు భక్తులందరిపై ఉండాలని కోరుకుంటున్నాము.",
  },
};

function About() {
  const { language } = useLanguage();
  const text = content[language] || content.en;

  return (
    <main className={`about-page ${language === "te" ? "about-page--telugu" : ""}`}>
      <section className="about-hero">
        <div className="about-hero__ornament" aria-hidden="true">
          <span>ॐ</span>
        </div>

        <motion.div
          className="about-hero__content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="about-eyebrow">{text.eyebrow}</span>
          <h1>
            {text.title}
            <span>{text.titleAccent}</span>
          </h1>
          <p>{text.intro}</p>
        </motion.div>

        <div className="about-hero__bottom-mark" aria-hidden="true">
          <span />
          <Flame size={22} />
          <span />
        </div>
      </section>

      <section className="about-section about-overview">
        <div className="about-section__heading">
          <span className="about-eyebrow">NANDAVARAM</span>
          <h2>{text.locationTitle}</h2>
        </div>

        <div className="about-overview__grid">
          <motion.article
            className="about-info-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <span className="about-info-card__icon">
              <MapPin size={25} />
            </span>
            <h3>{text.locationTitle}</h3>
            <p>{text.location}</p>
          </motion.article>

          <motion.article
            className="about-info-card about-info-card--highlight"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <span className="about-info-card__icon">
              <Landmark size={25} />
            </span>
            <h3>{text.templeTitle}</h3>
            <p>{text.temple}</p>
          </motion.article>
        </div>
      </section>

      <section className="about-legend">
        <div className="about-legend__symbol" aria-hidden="true">
          <Flame size={42} />
          <span>ॐ</span>
        </div>

        <div className="about-legend__content">
          <span className="about-eyebrow">{text.legendEyebrow}</span>
          <h2>{text.legendTitle}</h2>
          <p>{text.legend}</p>
          <div className="about-legend__note">
            <BookOpen size={18} />
            <span>{text.traditionNote}</span>
          </div>
        </div>
      </section>

      <section className="about-section about-significance">
        <div className="about-section__heading">
          <span className="about-eyebrow">{text.significanceEyebrow}</span>
          <h2>{text.significanceTitle}</h2>
          <p>{text.significance}</p>
        </div>

        <motion.article
          className="about-festival-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-festival-card__icon">
            <Flame size={34} />
          </div>
          <div>
            <span className="about-eyebrow">{text.significanceEyebrow}</span>
            <h3>{text.festivalTitle}</h3>
            <p>{text.festival}</p>
          </div>
        </motion.article>
      </section>

      <section className="about-visit">
        <div className="about-visit__icon">
          <MapPin size={30} />
        </div>
        <span className="about-eyebrow">{text.visitEyebrow}</span>
        <h2>{text.visitTitle}</h2>
        <p>{text.visitText}</p>
      </section>

      <section className="about-sources">
        <h2>{text.sourceTitle}</h2>
        <ul>
          <li>
            <a href="https://en.wikipedia.org/wiki/Nandavaram" target="_blank" rel="noreferrer">
              {text.sourceWikipedia}
            </a>
          </li>
          <li>
            <a href="https://nandyal.ap.gov.in/places-of-interest/" target="_blank" rel="noreferrer">
              {text.sourceDistrict}
            </a>
          </li>
          <li>
            <a href="https://nandyal.ap.gov.in/temple-tourism/" target="_blank" rel="noreferrer">
              {text.sourceTourism}
            </a>
          </li>
        </ul>
      </section>

      <section className="about-closing">
        <Sparkle size={20} aria-hidden="true" />
        <p>{text.closing}</p>
        <span>{text.closingTelugu}</span>
      </section>
    </main>
  );
}

export default About;
