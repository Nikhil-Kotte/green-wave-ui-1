import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "user" | "collector" | "ngo" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  demoAccounts: Array<{ email: string; password: string; name: string; role: UserRole; description: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts for easy testing
const demoAccounts = [
  { email: "user@demo.com", password: "demo123", name: "Sarah Green", role: "user" as UserRole, description: "Household User" },
  { email: "collector@demo.com", password: "demo123", name: "Mike Collector", role: "collector" as UserRole, description: "Waste Collector" },
  { email: "ngo@demo.com", password: "demo123", name: "Emma NGO", role: "ngo" as UserRole, description: "NGO Partner" },
  { email: "admin@demo.com", password: "demo123", name: "Admin Manager", role: "admin" as UserRole, description: "System Admin" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Initialize demo accounts in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.length === 0) {
      localStorage.setItem("users", JSON.stringify(demoAccounts));
    }

    // Check if user is already logged in
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user already exists
    if (existingUsers.some((u: any) => u.email === email)) {
      return { success: false, error: "User with this email already exists" };
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password, // In real app, this would be hashed
      role,
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    return { success: true };
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };
      setUser(authUser);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, demoAccounts }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};