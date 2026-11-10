
import { useState } from "react";
import { Check, Globe2, Languages, X } from "lucide-react";

import { useLanguage } from "../../context/useLanguage.js";
import "./LanguagePrompt.css";

const PROMPT_DISMISSED_KEY = "nandavaram-language-prompt-dismissed";
const LANGUAGE_STORAGE_KEY = "nandavaram-language";

function shouldShowPrompt() {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const dismissed = localStorage.getItem(PROMPT_DISMISSED_KEY);

    return !savedLanguage && !dismissed;
  } catch {
    return false;
  }
}

function LanguagePrompt() {
  const { changeLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(shouldShowPrompt);

  function closePrompt() {
    try {
      localStorage.setItem(PROMPT_DISMISSED_KEY, "true");
    } catch {
      // The prompt can still be dismissed without browser storage.
    }

    setIsVisible(false);
  }

  function selectLanguage(language) {
    changeLanguage(language);

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      localStorage.setItem(PROMPT_DISMISSED_KEY, "true");
    } catch {
      // Language selection remains available without browser storage.
    }

    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="language-prompt-overlay"
      role="presentation"
      onClick={closePrompt}
    >
      <section
        className="language-prompt"
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-prompt-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="language-prompt__close"
          onClick={closePrompt}
          aria-label="Close language selection"
        >
          <X size={20} />
        </button>

        <div className="language-prompt__icon">
          <Globe2 size={30} />
        </div>

        <span className="language-prompt__eyebrow">
          SRI CHOWDESWARI DEVI TEMPLE
        </span>

        <h2 id="language-prompt-title">
          Choose Your Language
        </h2>

        <h3 lang="te">
          మీ భాషను ఎంచుకోండి
        </h3>

        <p>
          Select the language you are comfortable with.
        </p>

        <p className="language-prompt__telugu-description" lang="te">
          మీకు అనువైన భాషను ఎంచుకోండి
        </p>

        <div className="language-prompt__choices">
          <button
            type="button"
            className="language-prompt__choice language-prompt__choice--telugu"
            onClick={() => selectLanguage("te")}
          >
            <span className="language-prompt__choice-icon">
              <Languages size={23} />
            </span>

            <span className="language-prompt__choice-text">
              <strong lang="te">తెలుగు</strong>
              <small>Telugu</small>
            </span>

            <Check
              className="language-prompt__choice-check"
              size={20}
            />
          </button>

          <button
            type="button"
            className="language-prompt__choice"
            onClick={() => selectLanguage("en")}
          >
            <span className="language-prompt__choice-icon">
              <Globe2 size={23} />
            </span>

            <span className="language-prompt__choice-text">
              <strong>English</strong>
              <small>English</small>
            </span>

            <Check
              className="language-prompt__choice-check"
              size={20}
            />
          </button>
        </div>

        <button
          type="button"
          className="language-prompt__later"
          onClick={closePrompt}
        >
          Choose Later / తర్వాత ఎంచుకోండి
        </button>
      </section>
    </div>
  );
}

export default LanguagePrompt;
