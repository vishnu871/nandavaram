
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home/Home.jsx";

function PlaceholderPage({ title, description }) {
  return (
    <section className="page-placeholder">
      <div className="page-placeholder__content">
        <p className="page-placeholder__eyebrow">
          Sri Chowdeswari Devi Temple
        </p>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <PlaceholderPage
      title="About the Temple"
      description="Discover the temple, its spiritual significance, traditions and heritage."
    />
  );
}

function MediaArchivePage() {
  return (
    <PlaceholderPage
      title="Media Archive"
      description="Explore temple photographs, videos and festival memories."
    />
  );
}

function AuthPage() {
  return (
    <PlaceholderPage
      title="Devotee Account"
      description="Account registration and sign-in will be implemented in a later stage."
    />
  );
}

function ProfilePage() {
  return (
    <PlaceholderPage
      title="My Profile"
      description="Your darshan bookings, donations and personal details will appear here after authentication is implemented."
    />
  );
}

function DarshanBookingPage() {
  return (
    <PlaceholderPage
      title="Darshan Booking"
      description="The devotee darshan booking experience will be implemented here."
    />
  );
}

function DonationsPage() {
  return (
    <PlaceholderPage
      title="Donations"
      description="Temple donation information and the donation process will be added here."
    />
  );
}

function EventsPage() {
  return (
    <PlaceholderPage
      title="Temple Events"
      description="Explore upcoming temple events and celebrations."
    />
  );
}

function NotFoundPage() {
  return (
    <PlaceholderPage
      title="Page Not Found"
      description="The page you are looking for does not exist."
    />
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/media-archive"
              element={<MediaArchivePage />}
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/darshan-booking"
              element={<DarshanBookingPage />}
            />
            <Route
              path="/donations"
              element={<DonationsPage />}
            />
            <Route path="/events" element={<EventsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
