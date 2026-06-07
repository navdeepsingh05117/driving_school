-- DrivePro Academy Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Courses Table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  duration VARCHAR(100) NOT NULL,
  lessons VARCHAR(100) NOT NULL,
  features JSONB NOT NULL,
  price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Instructors Table
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  experience VARCHAR(100) NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  certifications JSONB NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  course VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  date VARCHAR(50) NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  course VARCHAR(255) NOT NULL,
  preferred_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats Table
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  students_trained INTEGER DEFAULT 0,
  pass_rate DECIMAL(5, 2) DEFAULT 0.00,
  vehicles INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_instructors_rating ON instructors(rating);

-- Insert Sample Data

-- Courses
INSERT INTO courses (title, description, duration, lessons, features, price) VALUES
('Beginner Course', 'Perfect for first-time drivers. Learn the basics and build confidence on the road.', '8 weeks', '20 lessons', '["Road safety fundamentals", "Basic vehicle controls", "Traffic rules and regulations", "Parking techniques", "Highway driving preparation"]', 750.00),
('Advanced Course', 'Take your driving skills to the next level with advanced techniques and scenarios.', '6 weeks', '15 lessons', '["Defensive driving strategies", "Night and adverse weather driving", "Advanced parking maneuvers", "Emergency handling", "Highway and motorway mastery"]', 600.00),
('Intensive Course', 'Fast-track your learning with our intensive program designed for quick results.', '2 weeks', '30 lessons', '["Daily practical sessions", "Accelerated theory training", "Mock test preparation", "Personalized attention", "Test booking assistance"]', 1200.00);

-- Instructors
INSERT INTO instructors (name, specialty, experience, rating, certifications) VALUES
('Sarah Johnson', 'Beginner & Nervous Drivers', '12 years experience', 5, '["ADI Certified", "Fleet Trainer", "Pass Plus"]'),
('Michael Chen', 'Intensive Courses', '10 years experience', 5, '["ADI Certified", "Advanced Driving"]'),
('Emma Williams', 'Motorway & Highway', '8 years experience', 5, '["ADI Certified", "Defensive Driving"]'),
('David Brown', 'Test Preparation', '15 years experience', 5, '["ADI Certified", "Mock Test Specialist"]');

-- Reviews
INSERT INTO reviews (name, course, rating, review, date, verified) VALUES
('Jessica Martinez', 'Beginner Course', 5, 'Sarah was incredibly patient and made me feel comfortable from day one. I passed my test on the first try! The structured lessons and clear explanations helped me build confidence quickly.', 'May 2026', true),
('Tom Anderson', 'Intensive Course', 5, 'Michael''s intensive course was exactly what I needed. Two weeks and I was test-ready. His teaching methods are efficient and effective. Highly recommend for anyone in a hurry!', 'April 2026', true),
('Priya Patel', 'Advanced Course', 5, 'Emma helped me overcome my highway driving anxiety. Her calm demeanor and expert guidance made all the difference. Now I drive confidently anywhere!', 'March 2026', true),
('James Wilson', 'Full Course', 5, 'David prepared me thoroughly for my test. The mock tests were invaluable. Passed with only 2 minors! Best driving school in the area without a doubt.', 'February 2026', true),
('Lisa Chen', 'Beginner Course', 5, 'As a nervous driver, I was worried about learning. The instructors at DrivePro were so supportive. They celebrated every small win with me. Couldn''t have done it without them!', 'January 2026', true),
('Ryan Murphy', 'Package of 10', 5, 'Flexible scheduling was perfect for my work schedule. Modern cars, professional instructors, and great value for money. What more could you ask for?', 'December 2025', true);

-- Stats
INSERT INTO stats (students_trained, pass_rate, vehicles, average_rating) VALUES
(10000, 98.00, 50, 4.9);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Public read access for courses, instructors, reviews, and stats
CREATE POLICY "Allow public read access on courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access on instructors" ON instructors FOR SELECT USING (true);
CREATE POLICY "Allow public read access on reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read access on stats" ON stats FOR SELECT USING (true);

-- Public insert access for bookings (for form submissions)
CREATE POLICY "Allow public insert on bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Admin-only write access (you'll need to set up authentication for these)
-- These policies assume you have Supabase Auth set up with an admin role
-- For now, they're commented out - uncomment after setting up auth

-- CREATE POLICY "Allow admin insert on courses" ON courses FOR INSERT
--   USING (auth.jwt() ->> 'role' = 'admin');
-- CREATE POLICY "Allow admin update on courses" ON courses FOR UPDATE
--   USING (auth.jwt() ->> 'role' = 'admin');
-- CREATE POLICY "Allow admin delete on courses" ON courses FOR DELETE
--   USING (auth.jwt() ->> 'role' = 'admin');

-- CREATE POLICY "Allow admin insert on instructors" ON instructors FOR INSERT
--   USING (auth.jwt() ->> 'role' = 'admin');
-- CREATE POLICY "Allow admin update on instructors" ON instructors FOR UPDATE
--   USING (auth.jwt() ->> 'role' = 'admin');
-- CREATE POLICY "Allow admin delete on instructors" ON instructors FOR DELETE
--   USING (auth.jwt() ->> 'role' = 'admin');

-- CREATE POLICY "Allow admin insert on reviews" ON reviews FOR INSERT
--   USING (auth.jwt() ->> 'role' = 'admin');
-- CREATE POLICY "Allow admin update on reviews" ON reviews FOR UPDATE
--   USING (auth.jwt() ->> 'role' = 'admin');
-- CREATE POLICY "Allow admin delete on reviews" ON reviews FOR DELETE
--   USING (auth.jwt() ->> 'role' = 'admin');

-- CREATE POLICY "Allow admin update on stats" ON stats FOR UPDATE
--   USING (auth.jwt() ->> 'role' = 'admin');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE courses IS 'Stores driving course information';
COMMENT ON TABLE instructors IS 'Stores instructor profiles and certifications';
COMMENT ON TABLE reviews IS 'Stores customer reviews and testimonials';
COMMENT ON TABLE bookings IS 'Stores student lesson booking requests';
COMMENT ON TABLE stats IS 'Stores website statistics (students trained, pass rate, etc.)';
