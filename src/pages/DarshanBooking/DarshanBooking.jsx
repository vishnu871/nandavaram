
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  Heart,
  Printer,
  ShieldCheck,
  Ticket,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";

import { useLanguage } from "../../context/useLanguage.js";
import "./DarshanBooking.css";

const DARSHAN_OPTIONS = [
  {
    id: "archana",
    name: "Archana Seva",
    teluguName: "అర్చన సేవ",
    description: "A special Archana Seva offering.",
    teluguDescription: "ప్రత్యేక అర్చన సేవ",
    price: 116,
  },
  {
    id: "normal",
    name: "Normal Darshan",
    teluguName: "సాధారణ దర్శనం",
    description: "Regular temple darshan.",
    teluguDescription: "సాధారణ ఆలయ దర్శనం",
    price: 10,
  },
];

const LADDU_PRICE = 10;
const STORAGE_KEY = "nandavaram-darshan-bookings";

function getLocalDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createBookingReference() {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `NND-${Date.now().toString().slice(-6)}-${randomPart}`;
}

function formatDate(dateString) {
  if (!dateString) return "Not selected";

  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function saveBooking(booking) {
  try {
    const existingBookings = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const bookings = Array.isArray(existingBookings)
      ? existingBookings
      : [];

    bookings.unshift(booking);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

    return true;
  } catch {
    return false;
  }
}

function DarshanBooking() {
  const { language } = useLanguage();
  const isTelugu = language === "te";

  const [step, setStep] = useState(1);
  const [darshanType, setDarshanType] = useState("");
  const [pilgrimCount, setPilgrimCount] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [ladduCount, setLadduCount] = useState(0);

  const [contact, setContact] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [booking, setBooking] = useState(null);
  const [storageWarning, setStorageWarning] = useState(false);

  const selectedDarshan = DARSHAN_OPTIONS.find(
    (option) => option.id === darshanType
  );

  const darshanAmount = selectedDarshan
    ? selectedDarshan.price * pilgrimCount
    : 0;

  const ladduAmount = ladduCount * LADDU_PRICE;
  const totalAmount = darshanAmount + ladduAmount;

  const steps = [
    { number: 1, label: isTelugu ? "దర్శనం" : "Darshan" },
    { number: 2, label: isTelugu ? "వివరాలు" : "Details" },
    { number: 3, label: isTelugu ? "సారాంశం" : "Review" },
    { number: 4, label: isTelugu ? "చెల్లింపు" : "Payment" },
  ];

  const pageTitle = useMemo(() => {
    if (step === 1) return isTelugu ? "దర్శనాన్ని ఎంచుకోండి" : "Choose Your Darshan";
    if (step === 2) return isTelugu ? "భక్తుల వివరాలు" : "Pilgrim Details";
    if (step === 3) return isTelugu ? "బుకింగ్ వివరాలను పరిశీలించండి" : "Review Your Booking";
    if (step === 4) return isTelugu ? "చెల్లింపు" : "Payment";
    return isTelugu ? "బుకింగ్ నిర్ధారణ" : "Booking Confirmation";
  }, [step, isTelugu]);

  function updateContact(field, value) {
    setContact((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  }

  function validateDetails() {
    const newErrors = {};

    if (!darshanType) {
      newErrors.darshanType = isTelugu
        ? "దయచేసి దర్శన రకాన్ని ఎంచుకోండి."
        : "Please select a darshan type.";
    }

    if (!Number.isInteger(pilgrimCount) || pilgrimCount < 1 || pilgrimCount > 50) {
      newErrors.pilgrimCount = isTelugu
        ? "1 నుండి 50 మంది వరకు ఎంచుకోండి."
        : "Choose between 1 and 50 pilgrims.";
    }

    if (!bookingDate) {
      newErrors.bookingDate = isTelugu
        ? "దయచేసి దర్శన తేదీని ఎంచుకోండి."
        : "Please select your preferred darshan date.";
    } else if (bookingDate < getLocalDateString()) {
      newErrors.bookingDate = isTelugu
        ? "గత తేదీని ఎంచుకోలేరు."
        : "Please select today or a future date.";
    }

    if (!contact.name.trim()) {
      newErrors.name = isTelugu
        ? "పేరు తప్పనిసరి."
        : "Please enter the booking person's name.";
    }

    if (!/^[6-9]\d{9}$/.test(contact.mobile.trim())) {
      newErrors.mobile = isTelugu
        ? "సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి."
        : "Enter a valid 10-digit Indian mobile number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      newErrors.email = isTelugu
        ? "సరైన ఈమెయిల్ నమోదు చేయండి."
        : "Enter a valid email address.";
    }

    if (!Number.isInteger(ladduCount) || ladduCount < 0 || ladduCount > 100) {
      newErrors.ladduCount = isTelugu
        ? "0 నుండి 100 వరకు లడ్డూలను ఎంచుకోండి."
        : "Choose between 0 and 100 laddus.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function goToNextStep() {
    if (step === 1 && !darshanType) {
      setErrors({
        darshanType: isTelugu
          ? "దయచేసి దర్శన రకాన్ని ఎంచుకోండి."
          : "Please select a darshan type.",
      });
      return;
    }

    if (step === 1) {
      setErrors({});
      setStep(2);
      return;
    }

    if (step === 2 && validateDetails()) {
      setStep(3);
      return;
    }

    if (step === 3) {
      setPaymentStatus("pending");
      setStep(4);
    }
  }

  function goToPreviousStep() {
    if (step > 1 && step <= 4) {
      setStep((current) => current - 1);
      setErrors({});
    }
  }

  function simulatePayment(success) {
    if (!success) {
      setPaymentStatus("failed");
      return;
    }

    setPaymentStatus("processing");

    const newBooking = {
      bookingReference: createBookingReference(),
      bookingDate,
      createdAt: new Date().toISOString(),
      darshan: {
        id: selectedDarshan.id,
        name: selectedDarshan.name,
        pricePerPilgrim: selectedDarshan.price,
      },
      pilgrimCount,
      contact: {
        name: contact.name.trim(),
        mobile: contact.mobile.trim(),
        email: contact.email.trim(),
      },
      ladduCount,
      ladduPrice: LADDU_PRICE,
      darshanAmount,
      ladduAmount,
      totalAmount,
      paymentStatus: "SIMULATED_SUCCESS",
      bookingStatus: "SIMULATION_CONFIRMED",
      paymentReference: `TEST-${Date.now()}`,
      isSimulation: true,
    };

    const saved = saveBooking(newBooking);

    setBooking(newBooking);
    setStorageWarning(!saved);
    setPaymentStatus("success");
    setStep(5);
  }

  async function copyBookingReference() {
    if (!booking?.bookingReference) return;

    try {
      await navigator.clipboard.writeText(booking.bookingReference);
    } catch {
      // Copy may be unavailable in some browser environments.
    }
  }

  function startNewBooking() {
    setStep(1);
    setDarshanType("");
    setPilgrimCount(1);
    setBookingDate("");
    setLadduCount(0);
    setContact({
      name: "",
      mobile: "",
      email: "",
    });
    setErrors({});
    setPaymentStatus("pending");
    setBooking(null);
    setStorageWarning(false);
  }

  return (
    <div className="darshan-page">
      <section className="darshan-hero">
        <div className="darshan-hero__ornament" aria-hidden="true">
          ✦
        </div>

        <span className="darshan-hero__eyebrow">
          SRI CHOWDESWARI DEVI TEMPLE
        </span>

        <h1>
          {isTelugu ? "దర్శన టికెట్ బుకింగ్" : "Darshan Ticket Booking"}
        </h1>

        <p>
          {isTelugu
            ? "అమ్మవారి దర్శనానికి మీ బుకింగ్‌ను ఇక్కడ ప్రారంభించండి."
            : "Plan your visit and book your temple darshan with ease."}
        </p>
      </section>

      <main className="darshan-container">
        {step < 5 && (
          <div className="darshan-progress" aria-label="Booking progress">
            {steps.map((item, index) => (
              <div
                className={`darshan-progress__step ${
                  step >= item.number ? "is-active" : ""
                }`}
                key={item.number}
              >
                <div className="darshan-progress__circle">
                  {step > item.number ? (
                    <Check size={17} />
                  ) : (
                    item.number
                  )}
                </div>

                <span>{item.label}</span>

                {index < steps.length - 1 && (
                  <div
                    className={`darshan-progress__line ${
                      step > item.number ? "is-active" : ""
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <section className="darshan-card">
          {step < 5 && (
            <div className="darshan-card__heading">
              <div>
                <span className="darshan-card__step-label">
                  {isTelugu ? `దశ ${step} / 4` : `STEP ${step} OF 4`}
                </span>

                <h2>{pageTitle}</h2>
              </div>

              <div className="darshan-card__heading-icon">
                {step === 1 && <Ticket size={25} />}
                {step === 2 && <UserRound size={25} />}
                {step === 3 && <ShieldCheck size={25} />}
                {step === 4 && <CreditCard size={25} />}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="darshan-step">
              <p className="darshan-description">
                {isTelugu
                  ? "మీరు పొందాలనుకునే దర్శన రకాన్ని ఎంచుకోండి."
                  : "Select the darshan option for your visit."}
              </p>

              <div className="darshan-options">
                {DARSHAN_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    className={`darshan-option ${
                      darshanType === option.id ? "is-selected" : ""
                    }`}
                    onClick={() => {
                      setDarshanType(option.id);
                      setErrors({});
                    }}
                    aria-pressed={darshanType === option.id}
                  >
                    <span className="darshan-option__icon">
                      {option.id === "archana" ? (
                        <Heart size={25} />
                      ) : (
                        <Users size={25} />
                      )}
                    </span>

                    <span className="darshan-option__content">
                      <strong>
                        {isTelugu ? option.teluguName : option.name}
                      </strong>

                      <small>
                        {isTelugu
                          ? option.teluguDescription
                          : option.description}
                      </small>

                      <span className="darshan-option__price">
                        ₹{option.price}
                        <small>
                          {isTelugu ? " / భక్తునికి" : " / pilgrim"}
                        </small>
                      </span>
                    </span>

                    <span className="darshan-option__radio">
                      {darshanType === option.id && <Check size={15} />}
                    </span>
                  </button>
                ))}
              </div>

              {errors.darshanType && (
                <p className="darshan-error">{errors.darshanType}</p>
              )}

              <div className="darshan-info-note">
                <ShieldCheck size={19} />
                <p>
                  {isTelugu
                    ? "ధరలు ప్రతి భక్తునికి వర్తిస్తాయి."
                    : "Darshan charges are calculated per pilgrim."}
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="darshan-step">
              <p className="darshan-description">
                {isTelugu
                  ? "బుకింగ్ చేసే వ్యక్తి వివరాలు మరియు మొత్తం భక్తుల సంఖ్య నమోదు చేయండి."
                  : "Enter the primary booking contact and the total number of pilgrims."}
              </p>

              <div className="darshan-form-grid">
                <div className="darshan-field darshan-field--full">
                  <label htmlFor="booking-name">
                    {isTelugu ? "బుకింగ్ వ్యక్తి పేరు" : "Primary Contact Name"}
                    <span>*</span>
                  </label>

                  <input
                    id="booking-name"
                    type="text"
                    placeholder={isTelugu ? "మీ పూర్తి పేరు" : "Enter full name"}
                    value={contact.name}
                    onChange={(event) =>
                      updateContact("name", event.target.value)
                    }
                    autoComplete="name"
                  />

                  {errors.name && (
                    <small className="darshan-error">{errors.name}</small>
                  )}
                </div>

                <div className="darshan-field">
                  <label htmlFor="booking-mobile">
                    {isTelugu ? "మొబైల్ నంబర్" : "Mobile Number"}
                    <span>*</span>
                  </label>

                  <div className="darshan-input-prefix">
                    <span>+91</span>
                    <input
                      id="booking-mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={contact.mobile}
                      onChange={(event) =>
                        updateContact(
                          "mobile",
                          event.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      autoComplete="tel-national"
                    />
                  </div>

                  {errors.mobile && (
                    <small className="darshan-error">{errors.mobile}</small>
                  )}
                </div>

                <div className="darshan-field">
                  <label htmlFor="booking-email">
                    {isTelugu ? "ఈమెయిల్ చిరునామా" : "Email Address"}
                    <span>*</span>
                  </label>

                  <input
                    id="booking-email"
                    type="email"
                    placeholder="example@email.com"
                    value={contact.email}
                    onChange={(event) =>
                      updateContact("email", event.target.value)
                    }
                    autoComplete="email"
                  />

                  {errors.email && (
                    <small className="darshan-error">{errors.email}</small>
                  )}
                </div>

                <div className="darshan-field">
                  <label htmlFor="pilgrim-count">
                    {isTelugu ? "మొత్తం భక్తుల సంఖ్య" : "Number of Pilgrims"}
                    <span>*</span>
                  </label>

                  <div className="darshan-counter">
                    <button
                      type="button"
                      onClick={() =>
                        setPilgrimCount((count) => Math.max(1, count - 1))
                      }
                      disabled={pilgrimCount <= 1}
                      aria-label="Decrease pilgrim count"
                    >
                      −
                    </button>

                    <strong>{pilgrimCount}</strong>

                    <button
                      type="button"
                      onClick={() =>
                        setPilgrimCount((count) => Math.min(50, count + 1))
                      }
                      disabled={pilgrimCount >= 50}
                      aria-label="Increase pilgrim count"
                    >
                      +
                    </button>
                  </div>

                  <small className="darshan-field__hint">
                    {isTelugu
                      ? "ఒక బుకింగ్‌లో గరిష్ఠంగా 50 మంది"
                      : "Maximum 50 pilgrims per booking"}
                  </small>

                  {errors.pilgrimCount && (
                    <small className="darshan-error">
                      {errors.pilgrimCount}
                    </small>
                  )}
                </div>

                <div className="darshan-field">
                  <label htmlFor="booking-date">
                    {isTelugu ? "దర్శనానికి కావలసిన తేదీ" : "Preferred Darshan Date"}
                    <span>*</span>
                  </label>

                  <div className="darshan-date-wrap">
                    <CalendarDays size={18} />
                    <input
                      id="booking-date"
                      type="date"
                      min={getLocalDateString()}
                      value={bookingDate}
                      onChange={(event) => {
                        setBookingDate(event.target.value);
                        setErrors((current) => ({
                          ...current,
                          bookingDate: "",
                        }));
                      }}
                    />
                  </div>

                  {errors.bookingDate && (
                    <small className="darshan-error">
                      {errors.bookingDate}
                    </small>
                  )}
                </div>
              </div>

              <div className="darshan-laddu-section">
                <div className="darshan-laddu-section__heading">
                  <div>
                    <h3>{isTelugu ? "లడ్డూ ప్రసాదం" : "Laddu Prasadam"}</h3>
                    <p>
                      {isTelugu
                        ? "ఒక్కో లడ్డూ ₹10"
                        : "₹10 per laddu"}
                    </p>
                  </div>

                  <span className="darshan-laddu-section__price">
                    ₹10 <small>/ laddu</small>
                  </span>
                </div>

                <p className="darshan-description">
                  {isTelugu
                    ? "మీకు లడ్డూ ప్రసాదం కావాలా?"
                    : "Would you like to add laddu prasadam to your booking?"}
                </p>

                <div className="darshan-laddu-choice">
                  <button
                    type="button"
                    className={ladduCount === 0 ? "is-selected" : ""}
                    onClick={() => {
                      setLadduCount(0);
                      setErrors({});
                    }}
                  >
                    {isTelugu ? "వద్దు" : "No, thank you"}
                  </button>

                  <button
                    type="button"
                    className={ladduCount > 0 ? "is-selected" : ""}
                    onClick={() => setLadduCount((count) => count || 1)}
                  >
                    {isTelugu ? "కావాలి" : "Yes, add laddus"}
                  </button>
                </div>

                {ladduCount > 0 && (
                  <div className="darshan-laddu-quantity">
                    <span>
                      {isTelugu ? "లడ్డూల సంఖ్య" : "Number of laddus"}
                    </span>

                    <div className="darshan-counter">
                      <button
                        type="button"
                        onClick={() =>
                          setLadduCount((count) => Math.max(0, count - 1))
                        }
                        aria-label="Decrease laddu quantity"
                      >
                        −
                      </button>

                      <strong>{ladduCount}</strong>

                      <button
                        type="button"
                        onClick={() =>
                          setLadduCount((count) => Math.min(100, count + 1))
                        }
                        disabled={ladduCount >= 100}
                        aria-label="Increase laddu quantity"
                      >
                        +
                      </button>
                    </div>

                    <strong>₹{ladduAmount}</strong>
                  </div>
                )}

                {errors.ladduCount && (
                  <small className="darshan-error">{errors.ladduCount}</small>
                )}
              </div>

              <div className="darshan-price-preview">
                <span>{isTelugu ? "ప్రస్తుత మొత్తం" : "Current estimated total"}</span>
                <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
              </div>
            </div>
          )}

          {step === 3 && selectedDarshan && (
            <div className="darshan-step">
              <p className="darshan-description">
                {isTelugu
                  ? "చెల్లింపుకు ముందు మీ బుకింగ్ వివరాలను నిర్ధారించండి."
                  : "Please check your booking details before proceeding to payment."}
              </p>

              <div className="darshan-review-section">
                <div className="darshan-review-section__title">
                  <Ticket size={19} />
                  <h3>{isTelugu ? "దర్శన వివరాలు" : "Darshan Details"}</h3>
                </div>

                <div className="darshan-review-row">
                  <span>{isTelugu ? "దర్శన రకం" : "Darshan Type"}</span>
                  <strong>{isTelugu ? selectedDarshan.teluguName : selectedDarshan.name}</strong>
                </div>

                <div className="darshan-review-row">
                  <span>{isTelugu ? "తేదీ" : "Preferred Date"}</span>
                  <strong>{formatDate(bookingDate)}</strong>
                </div>

                <div className="darshan-review-row">
                  <span>{isTelugu ? "భక్తుల సంఖ్య" : "Number of Pilgrims"}</span>
                  <strong>{pilgrimCount}</strong>
                </div>
              </div>

              <div className="darshan-review-section">
                <div className="darshan-review-section__title">
                  <UserRound size={19} />
                  <h3>{isTelugu ? "బుకింగ్ వ్యక్తి" : "Primary Contact"}</h3>
                </div>

                <div className="darshan-review-row">
                  <span>{isTelugu ? "పేరు" : "Name"}</span>
                  <strong>{contact.name}</strong>
                </div>

                <div className="darshan-review-row">
                  <span>{isTelugu ? "మొబైల్" : "Mobile"}</span>
                  <strong>+91 {contact.mobile}</strong>
                </div>

                <div className="darshan-review-row">
                  <span>{isTelugu ? "ఈమెయిల్" : "Email"}</span>
                  <strong>{contact.email}</strong>
                </div>
              </div>

              <div className="darshan-review-section">
                <div className="darshan-review-section__title">
                  <Heart size={19} />
                  <h3>{isTelugu ? "ధరల వివరాలు" : "Price Breakdown"}</h3>
                </div>

                <div className="darshan-review-row">
                  <span>
                    {selectedDarshan.name} (₹{selectedDarshan.price} × {pilgrimCount})
                  </span>
                  <strong>₹{darshanAmount}</strong>
                </div>

                <div className="darshan-review-row">
                  <span>
                    {isTelugu ? "లడ్డూలు" : "Laddus"} ({ladduCount} × ₹{LADDU_PRICE})
                  </span>
                  <strong>₹{ladduAmount}</strong>
                </div>

                <div className="darshan-review-total">
                  <span>{isTelugu ? "చెల్లించవలసిన మొత్తం" : "Total Amount"}</span>
                  <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              <div className="darshan-info-note">
                <ShieldCheck size={19} />
                <p>
                  {isTelugu
                    ? "ఇది పరీక్షా చెల్లింపు మాత్రమే. నిజమైన చెల్లింపు జరగదు."
                    : "The next step uses a test payment simulation only. No real payment will be collected."}
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="darshan-step darshan-payment-step">
              <div className="darshan-payment-icon">
                <CreditCard size={30} />
              </div>

              <h3>{isTelugu ? "పరీక్షా చెల్లింపు" : "Test Payment"}</h3>

              <p className="darshan-description">
                {isTelugu
                  ? "ఇది డెమో చెల్లింపు విధానం. ఎటువంటి నిజమైన డబ్బు వసూలు చేయబడదు."
                  : "This is a demonstration payment screen. No real money, card or banking details are involved."}
              </p>

              <div className="darshan-payment-amount">
                <span>{isTelugu ? "మొత్తం" : "Amount to simulate"}</span>
                <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
              </div>

              {paymentStatus === "failed" && (
                <div className="darshan-payment-failed">
                  <XCircle size={21} />
                  <span>
                    {isTelugu
                      ? "పరీక్షా చెల్లింపు విఫలమైంది. మళ్లీ ప్రయత్నించండి."
                      : "The simulated payment failed. You can try again."}
                  </span>
                </div>
              )}

              <button
                type="button"
                className="darshan-button darshan-button--primary darshan-payment-success-button"
                onClick={() => simulatePayment(true)}
              >
                <CheckCircle2 size={19} />
                {isTelugu ? "పరీక్షా చెల్లింపు విజయవంతం" : "Simulate Successful Payment"}
              </button>

              <button
                type="button"
                className="darshan-button darshan-button--secondary"
                onClick={() => simulatePayment(false)}
              >
                <XCircle size={18} />
                {isTelugu ? "చెల్లింపు విఫలమవ్వాలి" : "Simulate Payment Failure"}
              </button>

              <p className="darshan-payment-disclaimer">
                <ShieldCheck size={16} />
                {isTelugu
                  ? "డెమో మాత్రమే — ఇది నిజమైన టికెట్ లేదా చెల్లింపు రసీదు కాదు."
                  : "Demo only — this is not a valid paid temple entry ticket or payment receipt."}
              </p>
            </div>
          )}

          {step === 5 && booking && (
            <div className="darshan-confirmation">
              <div className="darshan-confirmation__icon">
                <CheckCircle2 size={42} />
              </div>

              <span className="darshan-card__step-label">
                {isTelugu ? "డెమో బుకింగ్ నిర్ధారణ" : "DEMO BOOKING CONFIRMATION"}
              </span>

              <h2>
                {isTelugu ? "బుకింగ్ విజయవంతమైంది!" : "Booking Successful!"}
              </h2>

              <p className="darshan-description">
                {isTelugu
                  ? "మీ పరీక్షా బుకింగ్ వివరాలు క్రింద ఉన్నాయి."
                  : "Your test booking details are shown below."}
              </p>

              <div className="darshan-ticket">
                <div className="darshan-ticket__header">
                  <span>SRI CHOWDESWARI DEVI TEMPLE</span>
                  <strong>NANDAVARAM</strong>
                </div>

                <div className="darshan-ticket__reference">
                  <span>{isTelugu ? "బుకింగ్ రిఫరెన్స్" : "BOOKING REFERENCE"}</span>
                  <strong>{booking.bookingReference}</strong>

                  <button
                    type="button"
                    onClick={copyBookingReference}
                    aria-label="Copy booking reference"
                  >
                    <Copy size={15} />
                  </button>
                </div>

                <div className="darshan-ticket__body">
                  <div className="darshan-review-row">
                    <span>{isTelugu ? "పేరు" : "Booking Contact"}</span>
                    <strong>{booking.contact.name}</strong>
                  </div>

                  <div className="darshan-review-row">
                    <span>{isTelugu ? "మొబైల్" : "Mobile"}</span>
                    <strong>+91 {booking.contact.mobile}</strong>
                  </div>

                  <div className="darshan-review-row">
                    <span>{isTelugu ? "దర్శనం" : "Darshan"}</span>
                    <strong>{booking.darshan.name}</strong>
                  </div>

                  <div className="darshan-review-row">
                    <span>{isTelugu ? "తేదీ" : "Preferred Date"}</span>
                    <strong>{formatDate(booking.bookingDate)}</strong>
                  </div>

                  <div className="darshan-review-row">
                    <span>{isTelugu ? "భక్తులు" : "Pilgrims"}</span>
                    <strong>{booking.pilgrimCount}</strong>
                  </div>

                  <div className="darshan-review-row">
                    <span>{isTelugu ? "లడ్డూలు" : "Laddus"}</span>
                    <strong>{booking.ladduCount}</strong>
                  </div>

                  <div className="darshan-review-row">
                    <span>{isTelugu ? "దర్శన మొత్తం" : "Darshan Amount"}</span>
                    <strong>₹{booking.darshanAmount}</strong>
                  </div>

                  <div className="darshan-review-row">
                    <span>{isTelugu ? "లడ్డూ మొత్తం" : "Laddu Amount"}</span>
                    <strong>₹{booking.ladduAmount}</strong>
                  </div>

                  <div className="darshan-ticket__total">
                    <span>{isTelugu ? "మొత్తం" : "Total"}</span>
                    <strong>₹{booking.totalAmount}</strong>
                  </div>
                </div>

                <div className="darshan-ticket__footer">
                  <CheckCircle2 size={17} />
                  <span>
                    {isTelugu ? "పరీక్షా చెల్లింపు విజయవంతం" : "SIMULATED PAYMENT SUCCESSFUL"}
                  </span>
                </div>
              </div>

              <div className="darshan-demo-warning">
                <Clock3 size={19} />
                <p>
                  {isTelugu
                    ? "ఇది డెమో బుకింగ్ మాత్రమే. నిజమైన ఆలయ ప్రవేశ టికెట్ కాదు. అధికారిక బుకింగ్ వ్యవస్థ మరియు చెల్లింపు అనుసంధానం ఇంకా చేయాల్సి ఉంది."
                    : "This is a demonstration booking only, not a valid temple entry ticket. Official booking approval, slot availability and real payment integration are not yet connected."}
                </p>
              </div>

              {storageWarning && (
                <p className="darshan-error">
                  Booking was confirmed for this demonstration, but your browser could not save it locally. Please print this page if you need a copy.
                </p>
              )}

              <div className="darshan-confirmation__actions">
                <button
                  type="button"
                  className="darshan-button darshan-button--primary"
                  onClick={() => window.print()}
                >
                  <Printer size={18} />
                  {isTelugu ? "టికెట్ ప్రింట్ చేయండి" : "Print Ticket"}
                </button>

                <button
                  type="button"
                  className="darshan-button darshan-button--secondary"
                  onClick={startNewBooking}
                >
                  {isTelugu ? "కొత్త బుకింగ్" : "New Booking"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step < 5 && (
            <div className="darshan-card__footer">
              {step > 1 ? (
                <button
                  type="button"
                  className="darshan-button darshan-button--secondary"
                  onClick={goToPreviousStep}
                >
                  <ArrowLeft size={18} />
                  {isTelugu ? "వెనక్కి" : "Back"}
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                className="darshan-button darshan-button--primary"
                onClick={goToNextStep}
              >
                {step === 3
                  ? isTelugu
                    ? "చెల్లింపుకు వెళ్లండి"
                    : "Proceed to Payment"
                  : isTelugu
                    ? "కొనసాగించండి"
                    : "Continue"}

                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </section>

        <p className="darshan-page__note">
          {isTelugu
            ? "ధరలు ఆలయ కమిటీ నిర్ధారించిన వివరాల ప్రకారం మాత్రమే అమలు చేయాలి."
            : "Rates shown are based on the initial prices provided. Final rates, darshan timings and booking availability must be approved by the temple committee."}
        </p>
      </main>
    </div>
  );
}

export default DarshanBooking;
