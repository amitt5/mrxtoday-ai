'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { saveUserRoleToDB, saveUserToDB } from '../lib/supabaseHelpers';
const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("session222", session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange( (_event, session) => {
      console.log("session111", session, _event);
      if (_event === "SIGNED_IN" && session?.user) {
        const user = session.user;

        // Save user to the database
        saveUserToDB(user);
        saveUserRoleToDB(user);
      }
      setUser(session?.user ?? null);
      if (!session) {
        console.log('NO SESSION — REDIRECTING TO /');
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};