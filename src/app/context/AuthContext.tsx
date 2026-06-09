import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../../utils/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionToken: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    return localStorage.getItem('adminSessionToken');
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = () => {
    setIsAuthenticated(false);
    setSessionToken(null);
    localStorage.removeItem('adminSessionToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminAuth');
  };

  useEffect(() => {
    let isMounted = true;

    const verifyStoredSession = async () => {
      if (!isSupabaseConfigured || !sessionToken) {
        clearSession();
        if (isMounted) setIsLoading(false);
        return;
      }

      const { data: isValid, error } = await supabase.rpc('verify_admin_session', {
        session_token: sessionToken,
      });

      if (!isMounted) return;

      if (error || !isValid) {
        clearSession();
      } else {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    verifyStoredSession();

    return () => {
      isMounted = false;
    };
  }, [sessionToken]);

  const login = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Supabase is not configured. Please connect your Supabase project first.',
      };
    }

    const { data: token, error: loginError } = await supabase.rpc('create_admin_session', {
      admin_email: email.trim().toLowerCase(),
      admin_password: password,
      verification_answer: null,
    });

    if (loginError || !token) {
      clearSession();
      return {
        success: false,
        error: loginError?.message || 'Admin password verification failed.',
      };
    }

    setSessionToken(token);
    setIsAuthenticated(true);
    localStorage.setItem('adminSessionToken', token);
    localStorage.setItem('adminEmail', email.trim().toLowerCase());
    return { success: true };
  };

  const logout = async () => {
    const token = sessionToken;
    clearSession();

    if (token) {
      await supabase.rpc('end_admin_session', {
        session_token: token,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, sessionToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
