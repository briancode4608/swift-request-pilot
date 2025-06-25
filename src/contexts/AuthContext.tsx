
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'business' | 'consumer' | 'transporter';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@deliverydrive.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'business@example.com',
    name: 'Business User',
    role: 'business',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'consumer@example.com',
    name: 'Consumer User',
    role: 'consumer',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'transporter@example.com',
    name: 'Transporter User',
    role: 'transporter',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('deliveryDriveUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') { // Simple mock password
      setUser(foundUser);
      localStorage.setItem('deliveryDriveUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('deliveryDriveUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
