
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  HandHeart,
  Building2,
  Utensils,
  CalendarDays,
  Printer,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useLanguage } from "../../context/useLanguage.js";
import "./Donations.css";

const CATEGORIES = [
  {
    id: "general",
    name: "General Temple Donation",
    description: "Contribute towards the temple's general activities.",
    icon: Heart,
  },
  {
    id: "annadanam",
    name: "Annadanam",
    description: "Support food offerings and meals for devotees.",
    icon: Utensils,
  },
  {
    id: "maintenance",
    name: "Temple Maintenance",
    description: "Support the upkeep of the temple premises.",
    icon: Building2,
  },
  {
    id: "festival",
    name: "Festival Donation",
    description: "Contribute towards temple festivals and celebrations.",
    icon: CalendarDays,
  },
];

const SUGGESTED_AMOUNTS = [101, 501, 1001, 2501];
const STORAGE_KEY = "nandavaram-donations";

function createReference() {
  return `NND-DON-${Date.now().toString().slice(-8)}`;
}

function Donations() {
  const { language } = useLanguage();
  const isTelugu = language === "te";

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("501");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [donation, setDonation] = useState(null);
  const [error, setError] = useState("");

  const selectedCategory = CATEGORIES.find((item) => item.id === category);
  const donationAmount = amount === "custom" ? Number(customAmount) : Number(amount);

  function validateDetails() {
    if (!category) {
      setError("Please select a donation purpose.");
      return false;
    }

    if (!Number.isFinite(donationAmount) || donationAmount < 1 || donationAmount > 1000000) {
      setError("Enter a valid donation amount between ₹1 and ₹10,00,000.");
      return false;
    }

    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return false;
    }

    setError("");
    return true;
  }

  function continueBooking() {
    if (step === 1 && !category) {
      setError("Please select a donation purpose.");
      return;
    }

    if (step === 1) {
      setError("");
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

  function completePayment(success) {
    if (!success) {
      setPaymentStatus("failed");
      return;
    }

    const record = {
      reference: createReference(),
      category: selectedCategory.name,
      amount: donationAmount,
      devotee: { name: name.trim(), mobile, email: email.trim() },
      createdAt: new Date().toISOString(),
      paymentStatus: "SIMULATED_SUCCESS",
      isSimulation: true,
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const records = Array.isArray(existing) ? existing : [];
      records.unshift(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // The on-screen confirmation remains available if storage is blocked.
    }

    setDonation(record);
    setPaymentStatus("success");
    setStep(5);
  }

  function reset() {
    setStep(1);
    setCategory("");
    setAmount("501");
    setCustomAmount("");
    setName("");
    setMobile("");
    setEmail("");
    setDonation(null);
    setPaymentStatus("pending");
    setError("");
  }

  return (
    <div className="donations-page">
      <section className="donations-hero">
        <span className="donations-hero__ornament">✦</span>
        <span className="donations-hero__eyebrow">
          SRI CHOWDESWARI DEVI TEMPLE
        </span>
        <h1>{isTelugu ? "ఆలయానికి విరాళం ఇవ్వండి" : "Support the Temple"}</h1>
        <p>
          {isTelugu
            ? "మీ భక్తి మరియు సహకారం ఆలయ సేవలకు తోడ్పడుతుంది."
            : "Your contribution supports temple activities and services."}
        </p>
      </section>

      <main className="donations-container">
        {step < 5 && (
          <div className="donations-progress">
            {["Purpose", "Details", "Review", "Payment"].map((label, index) => (
              <div
                className={`donations-progress__item ${step >= index + 1 ? "active" : ""}`}
                key={label}
              >
                <span>{step > index + 1 ? <CheckCircle2 size={17} /> : index + 1}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        )}

        <section className="donations-card">
          {step < 5 && (
            <header className="donations-card__header">
              <div>
                <small>STEP {step} OF 4</small>
                <h2>
                  {["Choose Donation Purpose", "Your Details", "Review Donation", "Test Payment"][step - 1]}
                </h2>
              </div>
              <HandHeart size={28} />
            </header>
          )}

          {step === 1 && (
            <div className="donations-content">
              <p className="donations-description">
                Choose how you would like to support Sri Chowdeswari Devi Temple.
              </p>

              <div className="donations-categories">
                {CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`donations-category ${category === item.id ? "selected" : ""}`}
                      onClick={() => {
                        setCategory(item.id);
                        setError("");
                      }}
                    >
                      <span className="donations-category__icon"><Icon size={24} /></span>
                      <strong>{item.name}</strong>
                      <small>{item.description}</small>
                      <span className="donations-category__radio">
                        {category === item.id && <CheckCircle2 size={18} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="donations-amount-section">
                <h3>Select Donation Amount</h3>
                <div className="donations-amounts">
                  {SUGGESTED_AMOUNTS.map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={amount === String(value) ? "selected" : ""}
                      onClick={() => setAmount(String(value))}
                    >
                      ₹{value.toLocaleString("en-IN")}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={amount === "custom" ? "selected" : ""}
                    onClick={() => setAmount("custom")}
                  >
                    Custom
                  </button>
                </div>

                {amount === "custom" && (
                  <input
                    type="number"
                    min="1"
                    max="1000000"
                    placeholder="Enter donation amount in ₹"
                    value={customAmount}
                    onChange={(event) => setCustomAmount(event.target.value)}
                  />
                )}
              </div>
              {error && <p className="donations-error">{error}</p>}
            </div>
          )}

          {step === 2 && (
            <div className="donations-content">
              <p className="donations-description">
                Enter the primary devotee's details for this donation.
              </p>

              <div className="donations-form">
                <label>
                  Full Name *
                  <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your full name" />
                </label>

                <label>
                  Mobile Number *
                  <div className="donations-mobile">
                    <span>+91</span>
                    <input
                      value={mobile}
                      maxLength={10}
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))}
                    />
                  </div>
                </label>

                <label>
                  Email Address *
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="example@email.com" />
                </label>
              </div>

              {error && <p className="donations-error">{error}</p>}
            </div>
          )}

          {step === 3 && selectedCategory && (
            <div className="donations-content">
              <div className="donations-review">
                <div><span>Donation Purpose</span><strong>{selectedCategory.name}</strong></div>
                <div><span>Devotee Name</span><strong>{name}</strong></div>
                <div><span>Mobile Number</span><strong>+91 {mobile}</strong></div>
                <div><span>Email Address</span><strong>{email}</strong></div>
                <div className="donations-review__total"><span>Donation Amount</span><strong>₹{donationAmount.toLocaleString("en-IN")}</strong></div>
              </div>
              <p className="donations-notice">
                This is a test payment demonstration. No real money will be collected.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="donations-content donations-payment">
              <div className="donations-payment__icon"><ShieldCheck size={34} /></div>
              <h3>Demonstration Payment</h3>
              <p>No real payment will be collected. Choose an outcome to test the donation flow.</p>
              <strong className="donations-payment__amount">₹{donationAmount.toLocaleString("en-IN")}</strong>

              {paymentStatus === "failed" && (
                <p className="donations-error"><XCircle size={17} /> Simulated payment failed. Please try again.</p>
              )}

              <button className="donations-button primary" type="button" onClick={() => completePayment(true)}>
                <CheckCircle2 size={18} /> Simulate Successful Payment
              </button>
              <button className="donations-button secondary" type="button" onClick={() => completePayment(false)}>
                <XCircle size={18} /> Simulate Payment Failure
              </button>
              <small className="donations-disclaimer">
                Demo only — this is not an official donation receipt or proof of payment.
              </small>
            </div>
          )}

          {step === 5 && donation && (
            <div className="donations-confirmation">
              <CheckCircle2 size={54} />
              <h2>Donation Demo Completed</h2>
              <p>Your simulated donation details are below.</p>

              <div className="donations-receipt">
                <header>
                  <strong>SRI CHOWDESWARI DEVI TEMPLE</strong>
                  <span>NANDAVARAM</span>
                </header>
                <div><span>Demo Reference</span><strong>{donation.reference}</strong></div>
                <div><span>Devotee</span><strong>{donation.devotee.name}</strong></div>
                <div><span>Purpose</span><strong>{donation.category}</strong></div>
                <div><span>Date</span><strong>{new Date(donation.createdAt).toLocaleDateString("en-IN")}</strong></div>
                <div className="donations-receipt__total"><span>Amount</span><strong>₹{donation.amount.toLocaleString("en-IN")}</strong></div>
                <footer>SIMULATED PAYMENT SUCCESSFUL — NOT AN OFFICIAL RECEIPT</footer>
              </div>

              <p className="donations-notice">
                This is a demonstration only. The temple has not received money through this booking.
              </p>

              <div className="donations-confirmation__actions">
                <button className="donations-button primary" onClick={() => window.print()} type="button">
                  <Printer size={18} /> Print Demo Receipt
                </button>
                <button className="donations-button secondary" onClick={reset} type="button">
                  Make Another Donation <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step < 5 && (
            <footer className="donations-card__footer">
              {step > 1 ? (
                <button className="donations-button secondary" type="button" onClick={() => { setStep(step - 1); setError(""); }}>
                  <ArrowLeft size={17} /> Back
                </button>
              ) : <span />}

              <button className="donations-button primary" type="button" onClick={continueBooking}>
                {step === 3 ? "Proceed to Payment" : "Continue"} <ArrowRight size={17} />
              </button>
            </footer>
          )}
        </section>

        <p className="donations-footnote">
          Donation categories and payment details must be approved by the temple committee before accepting real donations.
        </p>
      </main>
    </div>
  );
}

export default Donations;
