import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import Courses from './components/Courses';
import Pricing from './components/Pricing';
import Instructors from './components/Instructors';
import Reviews from './components/Reviews';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import SEO from './components/SEO';

const AdminLogin = lazy(() => import('./pages/AdminLogin').then((module) => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));
const DatabaseSetup = lazy(() => import('./pages/DatabaseSetup').then((module) => ({ default: module.DatabaseSetup })));

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Saini Driving School | Learn Safe Driving with Certified Instructors"
        description="Professional driving lessons in Batala, Punjab with certified instructors, road practice, theory training, flexible scheduling, and road test preparation."
      />
      <Navbar />
      <Hero />
      <Showcase />
      <Stats />
      <WhyChooseUs />
      <Courses />
      <Pricing />
      <Instructors />
      <Reviews />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/setup"
              element={
                <>
                  <SEO
                    title="Database Setup | Saini Driving School"
                    description="Database setup utility for Saini Driving School booking and admin management."
                    path="/setup"
                  />
                  <DatabaseSetup />
                </>
              }
            />
            <Route
              path="/admin/login"
              element={
                <>
                  <SEO
                    title="Admin Login | Saini Driving School"
                    description="Secure admin login for managing Saini Driving School booking requests."
                    path="/admin/login"
                  />
                  <AdminLogin />
                </>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <>
                  <SEO
                    title="Admin Dashboard | Saini Driving School"
                    description="Saini Driving School dashboard for reviewing and managing lesson booking requests."
                    path="/admin/dashboard"
                  />
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
      <Analytics />
    </BrowserRouter>
  );
}
