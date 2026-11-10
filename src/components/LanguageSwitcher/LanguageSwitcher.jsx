import { Globe, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../context/useLanguage.js";
import "./LanguageSwitcher.css";

function LanguageSwitcher() {
  const { language, changeLanguage, translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: "en",
      label: "English",
      nativeLabel: "English",
    },
    {
      code: "te",
      label: "Telugu",
      nativeLabel: "తెలుగు",
    },
  ];

  const handleLanguageChange = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        type="button"
        className={`language-switcher__trigger ${
          isOpen ? "is-open" : ""
        }`}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={translations.common.chooseLanguage}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={17} strokeWidth={1.8} />

        <span className="language-switcher__current">
          {language.toUpperCase()}
        </span>

        <ChevronDown
          size={14}
          className="language-switcher__chevron"
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="language-switcher__outside"
            aria-label={translations.common.close}
            onClick={() => setIsOpen(false)}
          />

          <div className="language-switcher__dropdown">
            <span className="language-switcher__heading">
              {translations.common.chooseLanguage}
            </span>

            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`language-switcher__option ${
                  language === item.code ? "is-selected" : ""
                }`}
                onClick={() => handleLanguageChange(item.code)}
              >
                <span>{item.nativeLabel}</span>

                {language === item.code && (
                  <Check size={16} strokeWidth={2} />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSwitcher;