'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: 'CLIENT' | 'STAFF' | 'ADMIN' | 'SUPER_ADMIN';
  studioId?: string;
  firstName?: string;
  lastName?: string;
}

interface MockContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => void;
}

const MockContext = createContext<MockContextType | undefined>(undefined);

export default function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    let storedUser = localStorage.getItem('mock_user');

    // Auto-seed demo data if nothing exists
    if (!storedUser) {
      const demoStudioId = 'demo-studio-1';
      const demoUser: User = {
        uid: 'demo-admin-1',
        email: 'admin@demo.com',
        displayName: 'Demo Admin',
        photoURL: 'https://ui-avatars.com/api/?name=Demo+Admin&background=2563eb&color=fff',
        role: 'ADMIN',
        studioId: demoStudioId,
        firstName: 'Demo',
        lastName: 'Admin',
      };
      localStorage.setItem('mock_user', JSON.stringify(demoUser));
      storedUser = JSON.stringify(demoUser);

      // Seed demo studio
      localStorage.setItem(
        `mock_studio_${demoStudioId}`,
        JSON.stringify({
          id: demoStudioId,
          businessName: 'Viva La Beauty',
          businessType: 'waxing',
          domain: 'demo.local',
          primaryColor: '#d946ef',
          phone: '(281) 555-0123',
          email: 'info@vivalabeauty.com',
          address: '123 Beauty Lane',
          city: 'Sugar Land',
          state: 'TX',
          zip: '77478',
          isActive: true,
          isPublished: true,
        })
      );
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleSignInWithGoogle = async () => {
    // Simulate Google sign in
    const mockUser: User = {
      uid: 'mock-google-123',
      email: 'demo@waxingsetudios.com',
      displayName: 'Demo User',
      photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=D8006E&color=fff',
      role: 'ADMIN',
      studioId: undefined, // Will be set after setup
    };
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    // Simulate email sign in
    const mockUser: User = {
      uid: 'mock-email-123',
      email,
      displayName: email.split('@')[0],
      photoURL: null,
      role: 'ADMIN',
    };
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
  };

  const handleSignUp = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    // Simulate sign up
    const mockUser: User = {
      uid: 'mock-signup-123',
      email,
      displayName: firstName && lastName ? `${firstName} ${lastName}` : email.split('@')[0],
      photoURL: null,
      role: 'ADMIN',
      firstName,
      lastName,
    };
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
  };

  const handleSignOut = async () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  const refreshUser = () => {
    // Reload user from localStorage to get updated studioId
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <MockContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle: handleSignInWithGoogle,
        signInWithEmail: handleSignInWithEmail,
        signUp: handleSignUp,
        signOut: handleSignOut,
        refreshUser,
      }}
    >
      {children}
    </MockContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
}
