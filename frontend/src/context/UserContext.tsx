import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a User object
interface User {
  name: string;
  isAdmin: boolean;
  // Add other user props as needed (e.g., email, ID, etc.)
}

// Define the context type, including user data and auth functions
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context with default values (mostly placeholders)
export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Custom hook for consuming the user context
export const useUser = () => useContext(UserContext);

// Provider component that wraps parts of the app needing user context
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Local state for current user

  // Set the user object when logging in
  const login = (userData: User) => {
    setUser(userData);
  };

  // Clear the user object on logout
  const logout = () => {
    setUser(null);
  };

  // Provide user data and auth functions to children components
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
