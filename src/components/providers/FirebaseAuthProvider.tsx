'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '@/lib/firebase';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db, COLLECTIONS } from '@/lib/firebase';

interface StudioUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'CLIENT' | 'STAFF' | 'ADMIN' | 'SUPER_ADMIN';
  studioId?: string; // The studio this user belongs to
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface FirebaseContextType {
  user: StudioUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export default function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StudioUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || userData.displayName,
            photoURL: firebaseUser.photoURL || userData.photoURL,
            role: userData.role || 'CLIENT',
            studioId: userData.studioId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
          });
        } else {
          // User exists in Firebase Auth but not in Firestore - create record
          const newUser: Omit<StudioUser, 'uid'> & { createdAt: any } = {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: 'CLIENT',
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid), newUser);
          setUser({
            uid: firebaseUser.uid,
            ...newUser,
            role: 'CLIENT',
          } as StudioUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // User data will be synced via onAuthStateChanged
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User data will be synced via onAuthStateChanged
    } catch (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Create user document in Firestore
      await setDoc(doc(db, COLLECTIONS.USERS, result.user.uid), {
        email,
        firstName,
        lastName,
        displayName: firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || email,
        role: 'CLIENT',
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle: handleSignInWithGoogle,
        signInWithEmail: handleSignInWithEmail,
        signUp: handleSignUp,
        signOut: handleSignOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebaseAuth() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  }
  return context;
}
