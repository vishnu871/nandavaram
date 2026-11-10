
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flame,
  KeyRound,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useLanguage } from "../../context/useLanguage.js";
import "./Auth.css";

const OTP_EXPIRY_SECONDS = 300;

const translations = {
  en: {
    eyebrow: "DEVOTEE ACCOUNT",
    title: "Welcome to",
    templeName: "Sri Chowdeswari Devi Temple",
    description:
      "Sign in or create your devotee account to access temple services and manage your bookings.",
    signIn: "Sign In",
    register: "Create Account",
    signInDescription: "Welcome back. Enter your details to continue.",
    registerDescription: "Join our devotee community.",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    sendOtp: "Generate OTP",
    verifyOtp: "Verify OTP",
    otpTitle: "Verify your identity",
    otpDescription:
      "Enter the six-digit verification code generated for your account.",
    otpLabel: "Enter 6-digit OTP",
    otpPlaceholder: "000000",
    resend: "Resend OTP",
    resendIn: "Resend available in",
    seconds: "seconds",
    expiresIn: "OTP expires in",
    demoTitle: "Development OTP",
    demoDescription:
      "This is a temporary testing code. No SMS or email has been sent.",
    copyOtp: "Copy OTP",
    otpCopied: "OTP copied",
    back: "Go Back",
    changeDetails: "Change details",
    successTitle: "Verification successful!",
    successDescription:
      "Your OTP was verified successfully. Real account creation and sign-in will be connected in the next authentication stage.",
    backHome: "Return to Home",
    invalidName: "Please enter your full name.",
    invalidContact: "Enter a valid email address or mobile number.",
    otpRequired: "Please enter the six-digit OTP.",
    otpGenerated: "A demo OTP has been generated.",
    resendSuccess: "A new demo OTP has been generated.",
    expiredOtp: "Your OTP has expired. Generate a new one.",
    invalidOtp: "Incorrect OTP. Please try again.",
    securityNote:
      "Your information will only be used for this demonstration. No account data is stored.",
    privacy: "Privacy",
    terms: "Terms",
    backToHome: "Back to Home",
    mobileOrEmail: "Email or Mobile Number",
    mobileOrEmailPlaceholder: "Enter your email or mobile number",
    demoMode: "Temporary OTP demonstration",
  },

  te: {
    eyebrow: "భక్తుల ఖాతా",
    title: "స్వాగతం",
    templeName: "శ్రీ చౌడేశ్వరి దేవి ఆలయం",
    description:
      "ఆలయ సేవలను పొందడానికి మరియు మీ బుకింగ్‌లను నిర్వహించడానికి సైన్ ఇన్ చేయండి లేదా భక్తుని ఖాతాను సృష్టించండి.",
    signIn: "సైన్ ఇన్",
    register: "ఖాతా సృష్టించండి",
    signInDescription: "తిరిగి స్వాగతం. కొనసాగించడానికి వివరాలను నమోదు చేయండి.",
    registerDescription: "మన భక్తుల సమాజంలో చేరండి.",
    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
    sendOtp: "OTP పొందండి",
    verifyOtp: "OTP ధృవీకరించండి",
    otpTitle: "మీ వివరాలను ధృవీకరించండి",
    otpDescription: "మీ ఖాతా కోసం రూపొందించిన ఆరు అంకెల OTP నమోదు చేయండి.",
    otpLabel: "6 అంకెల OTP నమోదు చేయండి",
    otpPlaceholder: "000000",
    resend: "మళ్లీ OTP పొందండి",
    resendIn: "మళ్లీ పొందడానికి",
    seconds: "సెకన్లు",
    expiresIn: "OTP గడువు",
    demoTitle: "పరీక్షా OTP",
    demoDescription:
      "ఇది తాత్కాలిక పరీక్షా కోడ్ మాత్రమే. SMS లేదా ఇమెయిల్ పంపబడలేదు.",
    copyOtp: "OTP కాపీ చేయండి",
    otpCopied: "OTP కాపీ చేయబడింది",
    back: "వెనక్కి",
    changeDetails: "వివరాలను మార్చండి",
    successTitle: "ధృవీకరణ విజయవంతమైంది!",
    successDescription:
      "మీ OTP విజయవంతంగా ధృవీకరించబడింది. నిజమైన ఖాతా సృష్టి మరియు సైన్ ఇన్ తదుపరి దశలో అనుసంధానించబడతాయి.",
    backHome: "హోమ్‌కు తిరిగి వెళ్లండి",
    invalidName: "దయచేసి మీ పూర్తి పేరు నమోదు చేయండి.",
    invalidContact: "సరైన ఇమెయిల్ లేదా మొబైల్ నంబర్ నమోదు చేయండి.",
    otpRequired: "దయచేసి ఆరు అంకెల OTP నమోదు చేయండి.",
    otpGenerated: "పరీక్షా OTP రూపొందించబడింది.",
    resendSuccess: "కొత్త పరీక్షా OTP రూపొందించబడింది.",
    expiredOtp: "మీ OTP గడువు ముగిసింది. కొత్త OTP పొందండి.",
    invalidOtp: "తప్పు OTP. మళ్లీ ప్రయత్నించండి.",
    securityNote:
      "ఈ ప్రదర్శన కోసం మాత్రమే మీ వివరాలు ఉపయోగించబడతాయి. ఖాతా సమాచారం నిల్వ చేయబడదు.",
    privacy: "గోప్యత",
    terms: "నిబంధనలు",
    backToHome: "హోమ్‌కు తిరిగి వెళ్లండి",
    mobileOrEmail: "ఇమెయిల్ లేదా మొబైల్ నంబర్",
    mobileOrEmailPlaceholder: "ఇమెయిల్ లేదా మొబైల్ నంబర్ నమోదు చేయండి",
    demoMode: "తాత్కాలిక OTP పరీక్ష",
  },
};

function generateDemoOtp() {
  const values = new Uint32Array(1);

  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(values);
    return String(values[0] % 1000000).padStart(6, "0");
  }

  return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

function Auth() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const text = translations[language] || translations.en;

  const [mode, setMode] = useState("signin");
  const [step, setStep] = useState("details");

  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(
    OTP_EXPIRY_SECONDS,
  );

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (step !== "otp" || !expiryTime) {
      return undefined;
    }

    const updateRemainingTime = () => {
      const seconds = Math.max(
        0,
        Math.ceil((expiryTime - Date.now()) / 1000),
      );

      setRemainingTime(seconds);
    };

    updateRemainingTime();

    const timer = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(timer);
  }, [step, expiryTime]);

  function validateDetails() {
    if (mode === "register" && !fullName.trim()) {
      setError(text.invalidName);
      return false;
    }

    if (!contact.trim()) {
      setError(text.invalidContact);
      return false;
    }

    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());

    const mobileValid = /^[6-9]\d{9}$/.test(contact.trim());

    if (!emailValid && !mobileValid) {
      setError(text.invalidContact);
      return false;
    }

    return true;
  }

  function handleGenerateOtp(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!validateDetails()) {
      return;
    }

    const newOtp = generateDemoOtp();

    setGeneratedOtp(newOtp);
    setOtp("");
    setCopied(false);
    setRemainingTime(OTP_EXPIRY_SECONDS);
    setExpiryTime(Date.now() + OTP_EXPIRY_SECONDS * 1000);

    setStep("otp");
    setMessage(text.otpGenerated);
  }

  function handleVerifyOtp(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError(text.otpRequired);
      return;
    }

    if (Date.now() >= expiryTime) {
      setError(text.expiredOtp);
      setRemainingTime(0);
      return;
    }

    if (otp !== generatedOtp) {
      setError(text.invalidOtp);
      return;
    }

    setStep("success");
    setGeneratedOtp("");
    setOtp("");
  }

  function handleResendOtp() {
    if (!validateDetails()) {
      return;
    }

    const newOtp = generateDemoOtp();

    setGeneratedOtp(newOtp);
    setOtp("");
    setCopied(false);
    setRemainingTime(OTP_EXPIRY_SECONDS);
    setExpiryTime(Date.now() + OTP_EXPIRY_SECONDS * 1000);

    setError("");
    setMessage(text.resendSuccess);
  }

  function handleChangeMode(nextMode) {
    setMode(nextMode);
    setStep("details");
    setError("");
    setMessage("");
    setOtp("");
    setGeneratedOtp("");
    setExpiryTime(null);
    setRemainingTime(OTP_EXPIRY_SECONDS);
  }

  function handleChangeDetails() {
    setStep("details");
    setOtp("");
    setGeneratedOtp("");
    setExpiryTime(null);
    setError("");
    setMessage("");
  }

  async function handleCopyOtp() {
    try {
      await navigator.clipboard.writeText(generatedOtp);
      setCopied(true);
    } catch {
      setError("Unable to copy OTP. Please copy it manually.");
    }
  }

  function handleBackHome() {
    navigate("/");
  }

  return (
    <main className="auth-page">
      <div className="auth-page__background">
        <div className="auth-page__mandala auth-page__mandala--one" />
        <div className="auth-page__mandala auth-page__mandala--two" />
      </div>

      <div className="auth-page__container">
        <Link to="/" className="auth-back-link">
          <ArrowLeft size={17} />
          <span>{text.backToHome}</span>
        </Link>

        <section className="auth-card">
          <div className="auth-card__brand">
            <div className="auth-card__temple-icon">
              <Flame size={30} />
            </div>

            <span className="auth-card__eyebrow">
              {text.eyebrow}
            </span>

            <h1>
              {text.title}
              <span>{text.templeName}</span>
            </h1>

            <p>{text.description}</p>
          </div>

          {step === "details" && (
            <>
              <div className="auth-tabs">
                <button
                  type="button"
                  className={
                    mode === "signin"
                      ? "auth-tabs__button auth-tabs__button--active"
                      : "auth-tabs__button"
                  }
                  onClick={() => handleChangeMode("signin")}
                >
                  {text.signIn}
                </button>

                <button
                  type="button"
                  className={
                    mode === "register"
                      ? "auth-tabs__button auth-tabs__button--active"
                      : "auth-tabs__button"
                  }
                  onClick={() => handleChangeMode("register")}
                >
                  {text.register}
                </button>
              </div>

              <div className="auth-form-heading">
                <h2>
                  {mode === "register" ? text.register : text.signIn}
                </h2>

                <p>
                  {mode === "register"
                    ? text.registerDescription
                    : text.signInDescription}
                </p>
              </div>

              <form
                className="auth-form"
                onSubmit={handleGenerateOtp}
              >
                {mode === "register" && (
                  <div className="auth-field">
                    <label htmlFor="auth-full-name">
                      {text.fullName}
                    </label>

                    <div className="auth-input-wrap">
                      <UserRound size={19} />

                      <input
                        id="auth-full-name"
                        type="text"
                        autoComplete="name"
                        placeholder={text.fullNamePlaceholder}
                        value={fullName}
                        onChange={(event) =>
                          setFullName(event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="auth-field">
                  <label htmlFor="auth-contact">
                    {text.mobileOrEmail}
                  </label>

                  <div className="auth-input-wrap">
                    {contact.includes("@") ? (
                      <Mail size={19} />
                    ) : (
                      <Phone size={19} />
                    )}

                    <input
                      id="auth-contact"
                      type="text"
                      autoComplete="username"
                      placeholder={text.mobileOrEmailPlaceholder}
                      value={contact}
                      onChange={(event) =>
                        setContact(event.target.value.trimStart())
                      }
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="auth-alert auth-alert--error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="auth-alert auth-alert--success">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-primary-button"
                >
                  <span>{text.sendOtp}</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="auth-security-note">
                <ShieldCheck size={17} />
                <span>{text.securityNote}</span>
              </div>
            </>
          )}

          {step === "otp" && (
            <div className="auth-otp-section">
              <div className="auth-step-icon">
                <KeyRound size={28} />
              </div>

              <div className="auth-form-heading">
                <h2>{text.otpTitle}</h2>
                <p>{text.otpDescription}</p>
              </div>

              <div className="auth-contact-summary">
                {contact}

                <button
                  type="button"
                  onClick={handleChangeDetails}
                >
                  {text.changeDetails}
                </button>
              </div>

              <div className="auth-demo-otp">
                <div className="auth-demo-otp__heading">
                  <div>
                    <span className="auth-demo-otp__label">
                      {text.demoMode}
                    </span>

                    <h3>{text.demoTitle}</h3>
                  </div>

                  <span className="auth-demo-otp__badge">
                    TEST
                  </span>
                </div>

                <p>{text.demoDescription}</p>

                <div className="auth-demo-otp__code">
                  <strong>{generatedOtp}</strong>

                  <button
                    type="button"
                    onClick={handleCopyOtp}
                  >
                    {copied ? text.otpCopied : text.copyOtp}
                  </button>
                </div>
              </div>

              <form
                className="auth-form"
                onSubmit={handleVerifyOtp}
              >
                <div className="auth-field">
                  <label htmlFor="auth-otp">
                    {text.otpLabel}
                  </label>

                  <div className="auth-input-wrap auth-input-wrap--otp">
                    <KeyRound size={19} />

                    <input
                      id="auth-otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder={text.otpPlaceholder}
                      value={otp}
                      onChange={(event) =>
                        setOtp(
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6),
                        )
                      }
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="auth-alert auth-alert--error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="auth-alert auth-alert--success">
                    {message}
                  </div>
                )}

                <div className="auth-otp-timer">
                  <Clock3 size={17} />

                  <span>
                    {text.expiresIn}:{" "}
                    <strong>{formatTime(remainingTime)}</strong>
                  </span>
                </div>

                <button
                  type="submit"
                  className="auth-primary-button"
                  disabled={remainingTime <= 0}
                >
                  <span>{text.verifyOtp}</span>
                  <ShieldCheck size={18} />
                </button>
              </form>

              <div className="auth-resend">
                {remainingTime > 0 ? (
                  <span>
                    {text.resendIn} {remainingTime} {text.seconds}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                  >
                    <RefreshCw size={15} />
                    {text.resend}
                  </button>
                )}
              </div>

              <button
                type="button"
                className="auth-text-button"
                onClick={handleChangeDetails}
              >
                <ArrowLeft size={15} />
                {text.back}
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="auth-success">
              <div className="auth-success__icon">
                <CheckCircle2 size={48} />
              </div>

              <h2>{text.successTitle}</h2>

              <p>{text.successDescription}</p>

              <div className="auth-success__details">
                {mode === "register" && fullName.trim() && (
                  <span>{fullName}</span>
                )}

                <span>{contact}</span>
              </div>

              <button
                type="button"
                className="auth-primary-button"
                onClick={handleBackHome}
              >
                <span>{text.backHome}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </section>

        <div className="auth-page__footer">
          <span>{text.privacy}</span>
          <span className="auth-page__footer-dot">•</span>
          <span>{text.terms}</span>
        </div>
      </div>
    </main>
  );
}

export default Auth;
