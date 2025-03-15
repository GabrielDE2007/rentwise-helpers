
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextProps {
  currentUser: User | null;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function signup(email: string, password: string, displayName: string) {
    if (!auth) {
      throw new Error('Firebase authentication is not initialized. Check your environment variables.');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update the user's profile with the display name
    await updateProfile(userCredential.user, { displayName });
  }

  async function login(email: string, password: string) {
    if (!auth) {
      throw new Error('Firebase authentication is not initialized. Check your environment variables.');
    }
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    if (!auth) {
      throw new Error('Firebase authentication is not initialized. Check your environment variables.');
    }
    await signOut(auth);
  }

  async function resetPassword(email: string) {
    if (!auth) {
      throw new Error('Firebase authentication is not initialized. Check your environment variables.');
    }
    await sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    if (!auth) {
      setError('Firebase authentication is not initialized. Check your environment variables.');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    }, (error) => {
      console.error("Auth state change error:", error);
      setError('Authentication error occurred. Please try again later.');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
