import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type User = {
  username: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  signIn: (email: string) => void;
  signUp: (user: User) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// Session lives only in memory: it is lost when the app reloads.
// Replace with a real backend + persistent storage later.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Users registered during this session, so logging in again keeps their username
  const registeredUsers = useRef(new Map<string, User>());

  const signIn = useCallback((email: string) => {
    const key = email.toLowerCase();
    setUser(registeredUsers.current.get(key) ?? { username: key.split('@')[0], email: key });
  }, []);

  const signUp = useCallback((newUser: User) => {
    const normalized = { ...newUser, email: newUser.email.toLowerCase() };
    registeredUsers.current.set(normalized.email, normalized);
    setUser(normalized);
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, signIn, signUp, signOut }), [user, signIn, signUp, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}
