import { createContext } from "react";

type AuthContextType = {
  isRedirectFromRoot: boolean,
  setIsRedirectFromRoot: (isRedirected: boolean) => void,
  // userContext: UserResponse | null;
  // loading: boolean;
  // setUserContext: (user: UserResponse | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined)