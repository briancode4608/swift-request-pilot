
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

// Mock users with proper credentials matching the demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'business@example.com',
    password: 'business123',
    name: 'Business User',
    role: 'business',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'consumer@example.com',
    password: 'consumer123',
    name: 'Consumer User',
    role: 'consumer',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'transporter@example.com',
    password: 'transporter123',
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
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('deliveryDriveUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Find user with matching email and password
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('deliveryDriveUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    throw new Error('Invalid credentials');
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
