-- Saini Driving School Database Schema for Supabase
-- Safe to run on a new project or an existing project.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Core tables
CREATE TABLE IF NOT EXISTS courses (
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

CREATE TABLE IF NOT EXISTS instructors (
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

CREATE TABLE IF NOT EXISTS reviews (
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

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT,
  course VARCHAR(255) NOT NULL,
  preferred_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'New',
  admin_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  students_trained INTEGER DEFAULT 0,
  pass_rate DECIMAL(5, 2) DEFAULT 0.00,
  vehicles INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  verification_prompt TEXT,
  verification_answer_hash TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES app_admins(id) ON DELETE CASCADE,
  token_hash TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() + INTERVAL '12 hours',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Existing database upgrades
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS admin_note TEXT;
ALTER TABLE bookings ALTER COLUMN status SET DEFAULT 'New';
ALTER TABLE app_admins ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE app_admins ADD COLUMN IF NOT EXISTS verification_prompt TEXT;
ALTER TABLE app_admins ADD COLUMN IF NOT EXISTS verification_answer_hash TEXT;
ALTER TABLE app_admins ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

DELETE FROM app_admins
WHERE password_hash IS NULL;

UPDATE bookings
SET status = CASE
  WHEN status IS NULL OR lower(status) IN ('pending', 'new') THEN 'New'
  WHEN lower(status) = 'called' THEN 'Called'
  WHEN lower(status) = 'emailed' THEN 'Emailed'
  WHEN lower(status) = 'confirmed' THEN 'Confirmed'
  WHEN lower(status) IN ('cancelled', 'canceled') THEN 'Cancelled'
  ELSE 'New'
END;

ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('New', 'Called', 'Emailed', 'Confirmed', 'Cancelled'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_course ON bookings(course);
CREATE INDEX IF NOT EXISTS idx_bookings_preferred_datetime ON bookings(preferred_datetime);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_instructors_rating ON instructors(rating);
CREATE INDEX IF NOT EXISTS idx_app_admins_email ON app_admins (lower(email));
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token_hash ON admin_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- Remove old bundled demo rows before inserting the current site content.
DELETE FROM courses
WHERE title IN ('Beginner Course', 'Advanced Course', 'Intensive Course');

DELETE FROM instructors
WHERE name IN ('Sarah Johnson', 'Michael Chen', 'Emma Williams', 'David Brown');

DELETE FROM reviews
WHERE name IN (
  'Jessica Martinez',
  'Tom Anderson',
  'Priya Patel',
  'James Wilson',
  'Lisa Chen',
  'Ryan Murphy'
);

-- Sample data, inserted only when matching rows do not already exist.
INSERT INTO courses (title, description, duration, lessons, features, price)
SELECT 'Complete Driving Course', 'Comprehensive one-month program covering everything you need to become a confident driver.', '1 month', '20 lessons', '["Road practice sessions", "Theory practice and training", "Traffic rules and regulations", "Defensive driving techniques", "Test preparation and guidance"]', NULL
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE title = 'Complete Driving Course');

INSERT INTO instructors (name, specialty, experience, rating, certifications)
SELECT 'Parinder Singh', 'Beginner & Nervous Drivers', '12 years experience', 5, '["ADI Certified", "Fleet Trainer", "Pass Plus"]'
WHERE NOT EXISTS (SELECT 1 FROM instructors WHERE name = 'Parinder Singh');

INSERT INTO instructors (name, specialty, experience, rating, certifications)
SELECT 'Varinder Singh', 'Intensive Courses', '12 years experience', 5, '["ADI Certified", "Advanced Driving"]'
WHERE NOT EXISTS (SELECT 1 FROM instructors WHERE name = 'Varinder Singh');

INSERT INTO reviews (name, course, rating, review, date, verified)
SELECT 'Prabhjot Singh', 'Complete Driving Course', 5, 'The lessons were well organized and easy to understand. The road practice sessions helped me gain confidence quickly, and I passed my driving test on my first attempt.', 'May 2026', true
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE name = 'Prabhjot Singh' AND date = 'May 2026');

INSERT INTO reviews (name, course, rating, review, date, verified)
SELECT 'Gurpreet Kaur', 'Complete Driving Course', 5, 'I was nervous about driving at first, but the training made everything simple. The practical sessions were very helpful and gave me confidence on busy roads.', 'April 2026', true
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE name = 'Gurpreet Kaur' AND date = 'April 2026');

INSERT INTO reviews (name, course, rating, review, date, verified)
SELECT 'Harjot Singh', 'Complete Driving Course', 5, 'Excellent experience from start to finish. The combination of theory and road practice prepared me very well for the driving test. Highly recommended.', 'March 2026', true
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE name = 'Harjot Singh' AND date = 'March 2026');

INSERT INTO reviews (name, course, rating, review, date, verified)
SELECT 'Jaspreet Kaur', 'Complete Driving Course', 5, 'The flexible schedule made it easy to attend classes alongside my studies. The lessons were clear, practical, and focused on safe driving habits.', 'February 2026', true
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE name = 'Jaspreet Kaur' AND date = 'February 2026');

INSERT INTO reviews (name, course, rating, review, date, verified)
SELECT 'Manpreet Singh', 'Complete Driving Course', 5, 'Very professional training with plenty of road practice. The mock test sessions were especially useful and helped me feel fully prepared for the real exam.', 'January 2026', true
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE name = 'Manpreet Singh' AND date = 'January 2026');

INSERT INTO reviews (name, course, rating, review, date, verified)
SELECT 'Navjot Kaur', 'Complete Driving Course', 5, 'A great place for beginners. The lessons covered everything from basic vehicle control to traffic rules. I now feel confident driving independently.', 'December 2025', true
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE name = 'Navjot Kaur' AND date = 'December 2025');

INSERT INTO stats (students_trained, pass_rate, vehicles, average_rating)
SELECT 10000, 98.00, 50, 4.9
WHERE NOT EXISTS (SELECT 1 FROM stats);

-- Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION verify_admin_credentials(
  admin_email TEXT,
  admin_password TEXT,
  verification_answer TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.app_admins
    WHERE lower(email) = lower(admin_email)
      AND is_active = true
      AND password_hash IS NOT NULL
      AND password_hash = extensions.crypt(admin_password, password_hash)
      AND (
        verification_answer_hash IS NULL
        OR verification_answer_hash = extensions.crypt(COALESCE(verification_answer, ''), verification_answer_hash)
      )
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION hash_admin_session(session_token TEXT)
RETURNS TEXT AS $$
  SELECT encode(extensions.digest(session_token, 'sha256'), 'hex');
$$ LANGUAGE SQL IMMUTABLE SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION assert_admin_session(session_token TEXT)
RETURNS UUID AS $$
DECLARE
  active_admin_id UUID;
BEGIN
  DELETE FROM public.admin_sessions
  WHERE expires_at <= NOW();

  SELECT s.admin_id INTO active_admin_id
  FROM public.admin_sessions s
  JOIN public.app_admins a ON a.id = s.admin_id
  WHERE s.token_hash = public.hash_admin_session(session_token)
    AND s.expires_at > NOW()
    AND a.is_active = true
  LIMIT 1;

  IF active_admin_id IS NULL THEN
    RAISE EXCEPTION 'Invalid or expired admin session';
  END IF;

  UPDATE public.admin_sessions
  SET last_used_at = NOW()
  WHERE token_hash = public.hash_admin_session(session_token);

  RETURN active_admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION create_admin_session(
  admin_email TEXT,
  admin_password TEXT,
  verification_answer TEXT DEFAULT NULL
)
RETURNS TEXT AS $$
DECLARE
  admin_record public.app_admins%ROWTYPE;
  raw_token TEXT;
BEGIN
  SELECT * INTO admin_record
  FROM public.app_admins
  WHERE lower(email) = lower(admin_email)
    AND is_active = true
    AND password_hash IS NOT NULL
    AND password_hash = extensions.crypt(admin_password, password_hash)
    AND (
      verification_answer_hash IS NULL
      OR verification_answer_hash = extensions.crypt(COALESCE(verification_answer, ''), verification_answer_hash)
    )
  LIMIT 1;

  IF admin_record.id IS NULL THEN
    RETURN NULL;
  END IF;

  raw_token := encode(extensions.gen_random_bytes(32), 'hex');

  INSERT INTO public.admin_sessions (admin_id, token_hash)
  VALUES (admin_record.id, public.hash_admin_session(raw_token));

  RETURN raw_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION verify_admin_session(session_token TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  PERFORM public.assert_admin_session(session_token);
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION end_admin_session(session_token TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  DELETE FROM public.admin_sessions
  WHERE token_hash = public.hash_admin_session(session_token);

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION admin_list_bookings(session_token TEXT)
RETURNS SETOF public.bookings AS $$
BEGIN
  PERFORM public.assert_admin_session(session_token);

  RETURN QUERY
  SELECT *
  FROM public.bookings
  ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION admin_create_booking(
  session_token TEXT,
  booking_full_name TEXT,
  booking_email TEXT,
  booking_phone TEXT,
  booking_address TEXT,
  booking_course TEXT,
  booking_preferred_datetime TIMESTAMP WITH TIME ZONE,
  booking_message TEXT,
  booking_status TEXT,
  booking_admin_note TEXT
)
RETURNS public.bookings AS $$
DECLARE
  created_booking public.bookings%ROWTYPE;
BEGIN
  PERFORM public.assert_admin_session(session_token);

  INSERT INTO public.bookings (
    full_name,
    email,
    phone,
    address,
    course,
    preferred_datetime,
    message,
    status,
    admin_note
  )
  VALUES (
    booking_full_name,
    booking_email,
    booking_phone,
    booking_address,
    booking_course,
    booking_preferred_datetime,
    booking_message,
    booking_status,
    booking_admin_note
  )
  RETURNING * INTO created_booking;

  RETURN created_booking;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION admin_update_booking(
  session_token TEXT,
  booking_id UUID,
  booking_full_name TEXT,
  booking_email TEXT,
  booking_phone TEXT,
  booking_address TEXT,
  booking_course TEXT,
  booking_preferred_datetime TIMESTAMP WITH TIME ZONE,
  booking_message TEXT,
  booking_status TEXT,
  booking_admin_note TEXT
)
RETURNS public.bookings AS $$
DECLARE
  updated_booking public.bookings%ROWTYPE;
BEGIN
  PERFORM public.assert_admin_session(session_token);

  UPDATE public.bookings
  SET
    full_name = booking_full_name,
    email = booking_email,
    phone = booking_phone,
    address = booking_address,
    course = booking_course,
    preferred_datetime = booking_preferred_datetime,
    message = booking_message,
    status = booking_status,
    admin_note = booking_admin_note
  WHERE id = booking_id
  RETURNING * INTO updated_booking;

  IF updated_booking.id IS NULL THEN
    RAISE EXCEPTION 'Booking not found';
  END IF;

  RETURN updated_booking;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION admin_update_booking_status(
  session_token TEXT,
  booking_id UUID,
  booking_status TEXT
)
RETURNS public.bookings AS $$
DECLARE
  updated_booking public.bookings%ROWTYPE;
BEGIN
  PERFORM public.assert_admin_session(session_token);

  UPDATE public.bookings
  SET status = booking_status
  WHERE id = booking_id
  RETURNING * INTO updated_booking;

  IF updated_booking.id IS NULL THEN
    RAISE EXCEPTION 'Booking not found';
  END IF;

  RETURN updated_booking;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION admin_update_booking_note(
  session_token TEXT,
  booking_id UUID,
  booking_admin_note TEXT
)
RETURNS public.bookings AS $$
DECLARE
  updated_booking public.bookings%ROWTYPE;
BEGIN
  PERFORM public.assert_admin_session(session_token);

  UPDATE public.bookings
  SET admin_note = booking_admin_note
  WHERE id = booking_id
  RETURNING * INTO updated_booking;

  IF updated_booking.id IS NULL THEN
    RAISE EXCEPTION 'Booking not found';
  END IF;

  RETURN updated_booking;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

CREATE OR REPLACE FUNCTION admin_delete_booking(
  session_token TEXT,
  booking_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  PERFORM public.assert_admin_session(session_token);

  DELETE FROM public.bookings
  WHERE id = booking_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

REVOKE EXECUTE ON FUNCTION hash_admin_session(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION assert_admin_session(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION verify_admin_credentials(TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION create_admin_session(TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION verify_admin_session(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION end_admin_session(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION admin_list_bookings(TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION admin_create_booking(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE, TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION admin_update_booking(TEXT, UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE, TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION admin_update_booking_status(TEXT, UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION admin_update_booking_note(TEXT, UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION admin_delete_booking(TEXT, UUID) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION create_admin_session(TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION verify_admin_session(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION end_admin_session(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION admin_list_bookings(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION admin_create_booking(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE, TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION admin_update_booking(TEXT, UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE, TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION admin_update_booking_status(TEXT, UUID, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION admin_update_booking_note(TEXT, UUID, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION admin_delete_booking(TEXT, UUID) TO anon;

-- Policies are dropped first so this file can be rerun safely.
DROP POLICY IF EXISTS "Allow public read access on courses" ON courses;
CREATE POLICY "Allow public read access on courses"
  ON courses FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public read access on instructors" ON instructors;
CREATE POLICY "Allow public read access on instructors"
  ON instructors FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public read access on reviews" ON reviews;
CREATE POLICY "Allow public read access on reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public read access on stats" ON stats;
CREATE POLICY "Allow public read access on stats"
  ON stats FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public insert on bookings" ON bookings;
CREATE POLICY "Allow public insert on bookings"
  ON bookings FOR INSERT
  TO anon
  WITH CHECK (status = 'New' AND admin_note IS NULL);

DROP POLICY IF EXISTS "Allow app dashboard read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow app dashboard insert bookings" ON bookings;
DROP POLICY IF EXISTS "Allow app dashboard update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow app dashboard delete bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can read their own admin access" ON app_admins;
DROP POLICY IF EXISTS "Allow admins to read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admins to insert bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admins to update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admins to delete bookings" ON bookings;

-- Timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_instructors_updated_at ON instructors;
CREATE TRIGGER update_instructors_updated_at
  BEFORE UPDATE ON instructors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stats_updated_at ON stats;
CREATE TRIGGER update_stats_updated_at
  BEFORE UPDATE ON stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for booking updates if the table is not already published.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_publication
    WHERE pubname = 'supabase_realtime'
  ) AND NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'bookings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
  END IF;
END $$;

COMMENT ON TABLE courses IS 'Stores driving course information';
COMMENT ON TABLE instructors IS 'Stores instructor profiles and certifications';
COMMENT ON TABLE reviews IS 'Stores customer reviews and testimonials';
COMMENT ON TABLE bookings IS 'Stores student lesson booking requests and admin follow-up state';
COMMENT ON TABLE stats IS 'Stores website statistics';
COMMENT ON TABLE app_admins IS 'Admin login table for the dashboard. Passwords and verification answers are stored as hashes.';
COMMENT ON TABLE admin_sessions IS 'Short-lived admin dashboard sessions. Raw tokens are never stored.';

NOTIFY pgrst, 'reload schema';

-- To create or update an admin account manually, run this with your own password.
-- Passwords and verification answers are stored as hashes, not plain text:
-- INSERT INTO app_admins (
--   email,
--   password_hash,
--   verification_prompt,
--   verification_answer_hash,
--   is_active
-- )
-- VALUES (
--   'your-admin-email@example.com',
--   extensions.crypt('your-admin-password', extensions.gen_salt('bf')),
--   NULL,
--   NULL,
--   true
-- )
-- ON CONFLICT (email) DO UPDATE
-- SET
--   password_hash = EXCLUDED.password_hash,
--   verification_prompt = EXCLUDED.verification_prompt,
--   verification_answer_hash = EXCLUDED.verification_answer_hash,
--   is_active = true;
