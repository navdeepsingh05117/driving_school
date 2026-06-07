import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Courses from './components/Courses';
import WhyChooseUs from './components/WhyChooseUs';
import Pricing from './components/Pricing';
import Instructors from './components/Instructors';
import Reviews from './components/Reviews';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <Hero />
      <Stats />
      <Courses />
      <WhyChooseUs />
      <Pricing />
      <Instructors />
      <Reviews />
      <BookingForm />
      <Footer />
    </div>
  );
}