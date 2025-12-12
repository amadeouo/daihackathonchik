import { createContext } from "react";
import type {UserResponse} from "@/shared/hooks/useLogin.ts";

type AuthContextType = {
  userContext: UserResponse | null;
  loading: boolean;
  setUserContext: (user: UserResponse | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined)