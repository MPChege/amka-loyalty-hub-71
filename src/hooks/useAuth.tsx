
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'manager' | 'waiter';
  brand: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication - expanded with all role types
const mockUsers: User[] = [
  // Super Admin (Global Access)
  {
    id: '1',
    email: 'super@loyaltysystem.com',
    role: 'super_admin',
    brand: 'all',
    firstName: 'Global',
    lastName: 'Administrator'
  },
  
  // Brand Admins (Full Brand Access)
  {
    id: '2',
    email: 'admin@amka.com',
    role: 'admin',
    brand: 'amka',
    firstName: 'Amka',
    lastName: 'Admin'
  },
  {
    id: '3',
    email: 'admin@mawimbi.com',
    role: 'admin',
    brand: 'mawimbi',
    firstName: 'Mawimbi',
    lastName: 'Admin'
  },
  {
    id: '4',
    email: 'admin@kasa.com',
    role: 'admin',
    brand: 'kasa',
    firstName: 'Kasa',
    lastName: 'Admin'
  },
  
  // Brand Managers (Limited Brand Access)
  {
    id: '5',
    email: 'manager@amka.com',
    role: 'manager',
    brand: 'amka',
    firstName: 'Amka',
    lastName: 'Manager'
  },
  {
    id: '6',
    email: 'manager@mawimbi.com',
    role: 'manager',
    brand: 'mawimbi',
    firstName: 'Mawimbi',
    lastName: 'Manager'
  },
  {
    id: '7',
    email: 'manager@kasa.com',
    role: 'manager',
    brand: 'kasa',
    firstName: 'Kasa',
    lastName: 'Manager'
  },
  
  // Waiters/Staff (Order Management Only)
  {
    id: '8',
    email: 'waiter@amka.com',
    role: 'waiter',
    brand: 'amka',
    firstName: 'Amka',
    lastName: 'Waiter'
  },
  {
    id: '9',
    email: 'waiter@mawimbi.com',
    role: 'waiter',
    brand: 'mawimbi',
    firstName: 'Mawimbi',
    lastName: 'Waiter'
  },
  {
    id: '10',
    email: 'waiter@kasa.com',
    role: 'waiter',
    brand: 'kasa',
    firstName: 'Kasa',
    lastName: 'Waiter'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser || password !== 'loyalty123') {
        throw new Error('Invalid email or password');
      }
      
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      error
    }}>
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
