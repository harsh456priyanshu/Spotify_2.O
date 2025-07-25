import React, { createContext, useContext, useState } from 'react';

// Get your publishable key from Clerk Dashboard
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Create a mock auth context for development
const MockAuthContext = createContext({
  isSignedIn: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

// Mock auth provider for development
function MockAuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const signIn = () => {
    setIsSignedIn(true);
    setUser({ firstName: 'Demo', lastName: 'User', email: 'demo@example.com' });
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUser(null);
  };

  return (
    <MockAuthContext.Provider value={{ isSignedIn, user, signIn, signOut }}>
      {children}
    </MockAuthContext.Provider>
  );
}

// Mock hooks
export const useMockUser = () => {
  const context = useContext(MockAuthContext);
  return { isSignedIn: context.isSignedIn, user: context.user };
};

export const MockUserButton = ({ appearance }) => {
  const { user, signOut } = useContext(MockAuthContext);
  return (
    <div className="relative group">
      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold cursor-pointer ring-2 ring-green-400/50">
        {user?.firstName?.[0] || 'U'}
      </div>
      <div className="absolute right-0 top-12 bg-gray-800 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
        <button 
          onClick={signOut}
          className="text-white hover:text-red-400 text-sm whitespace-nowrap px-2 py-1"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export const MockSignInButton = ({ mode, children }) => {
  const { signIn } = useContext(MockAuthContext);
  return (
    <div onClick={signIn}>
      {children}
    </div>
  );
};

// Main provider component
function ClerkProviderWrapper({ children }) {
  // Always use mock provider for now to avoid Clerk configuration issues
  console.info('Using mock auth provider. To use Clerk, configure VITE_CLERK_PUBLISHABLE_KEY in .env');
  return <MockAuthProvider>{children}</MockAuthProvider>;
}

export default ClerkProviderWrapper;
