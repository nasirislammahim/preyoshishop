import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  login: (phoneOrEmail: string, name?: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const STORAGE_KEY = 'preyoshi_user_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default guest customer session for seamless demo experience
    return {
      id: 'USR-GUEST',
      name: 'Mahim Islam',
      email: 'nasirislammahimbd@gmail.com',
      phone: '01712-345678',
      role: 'customer',
      address: 'House 14, Road 5, Block B, Mirpur-10',
      division: 'Dhaka',
      district: 'Dhaka',
      createdAt: new Date().toISOString()
    };
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (phoneOrEmail: string, name = 'Valued Customer') => {
    const isEmail = phoneOrEmail.includes('@');
    const newUser: User = {
      id: 'USR-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      name,
      email: isEmail ? phoneOrEmail : '',
      phone: !isEmail ? phoneOrEmail : '01700-000000',
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
  };

  const loginAsAdmin = () => {
    const adminUser: User = {
      id: 'USR-ADMIN-01',
      name: 'Preyoshi Admin (Nurtaz Agency)',
      email: 'nasirislammahimbd@gmail.com',
      phone: '01700-000000',
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(adminUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setCurrentUser(prev => (prev ? { ...prev, ...updatedData } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        loginAsAdmin,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
