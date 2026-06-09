import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Database, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function DatabaseSetup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState<string[]>([]);

  const setupDatabase = async () => {
    setStatus('loading');
    setMessage('Setting up database...');
    setDetails([]);
    const steps: string[] = [];

    try {
      // Step 1: Create bookings table
      steps.push('Creating bookings table...');
      setDetails([...steps]);

      const { error: bookingsError } = await supabase.from('bookings').select('id').limit(1);

      if (bookingsError && bookingsError.code === '42P01') {
        // Table doesn't exist - user needs to create it manually
        setStatus('error');
        setMessage('Tables need to be created in Supabase dashboard');
        setDetails([
          'Please follow these steps:',
          '1. Go to your Supabase project dashboard',
          '2. Click on "SQL Editor" in the left sidebar',
          '3. Click "New Query"',
          '4. Copy the SQL setup script provided below',
          '5. Paste it into the editor and click "RUN"',
        ]);
        return;
      }

      // Step 2: Check app_admins table
      steps.push('Checking admin access table...');
      setDetails([...steps]);

      const { error: adminError } = await supabase.from('app_admins').select('email').limit(1);

      if (adminError && adminError.code === '42P01') {
        setStatus('error');
        setMessage('Tables need to be created in Supabase dashboard');
        setDetails([
          'Please follow these steps:',
          '1. Go to your Supabase project dashboard',
          '2. Click on "SQL Editor" in the left sidebar',
          '3. Click "New Query"',
          '4. Copy the SQL setup script provided below',
          '5. Paste it into the editor and click "RUN"',
        ]);
        return;
      }

      steps.push('Database schema is available.');
      setDetails([...steps]);
      setStatus('success');
      setMessage('Database is ready. Make sure you have created an admin row with a hashed password in Supabase.');
    } catch (error: any) {
      console.error('Setup error:', error);
      setStatus('error');
      setMessage(`Setup failed: ${error.message}`);
      setDetails([
        'Error details:',
        error.message,
        '',
        'Please ensure you have created the tables using the SQL script in your Supabase dashboard.',
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Setup</h1>
          <p className="text-gray-600">Initialize your Saini Driving School database</p>
        </div>

        {status === 'idle' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Before you begin:</h3>
              <p className="text-sm text-blue-800">
                This checks whether the required database tables exist.
                If tables do not exist, create them manually in Supabase with the repository schema.
              </p>
            </div>

            <button
              onClick={setupDatabase}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Setup
            </button>
          </div>
        )}

        {status === 'loading' && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">{message}</p>
            {details.length > 0 && (
              <div className="mt-4 text-left bg-gray-50 rounded-lg p-4">
                {details.map((detail, index) => (
                  <p key={index} className="text-sm text-gray-600">{detail}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Complete!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <a
                href="/admin/login"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Admin Login
              </a>
              <a
                href="/"
                className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Back to Home
              </a>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Instructions</h2>
              <p className="text-gray-600">{message}</p>
            </div>

            {details.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                {details.map((detail, index) => (
                  <p key={index} className="text-sm text-gray-700 mb-1">{detail}</p>
                ))}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-3">SQL Setup Script:</h3>
              <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs overflow-x-auto">
                <pre>{`-- First run the full supabase-schema.sql file from this repo.
-- Then create or rotate the admin password with your own values.

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

INSERT INTO app_admins (email, password_hash, is_active)
VALUES (
  'your-admin-email@example.com',
  extensions.crypt('your-admin-password', extensions.gen_salt('bf')),
  true
)
ON CONFLICT (email) DO UPDATE
SET password_hash = EXCLUDED.password_hash,
    is_active = true;

NOTIFY pgrst, 'reload schema';`}</pre>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={setupDatabase}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Try Again
              </button>
              <a
                href="/"
                className="block w-full bg-gray-100 text-center text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Back to Home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
