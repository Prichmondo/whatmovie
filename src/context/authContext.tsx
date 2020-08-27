import { createContext } from "react";

export type AuthProps = {
    isLoggedin: boolean;
    isInitializing: boolean;
    isLoginLoading: boolean;
    isLogoutLoading: boolean;
    error: string;
}

export type AuthAction = {
    signIn: (username: string, password: string) => void;
    signOut: () => void;
}

export type AuthState = AuthProps & AuthAction;

const defaultAuthState: AuthState = {
    isLoggedin: false,
    isInitializing: true,
    isLoginLoading: false,
    isLogoutLoading: false,
    error: '',
    signIn: () => {},
    signOut: () => {}
}

export const AuthContext = createContext<AuthState>(defaultAuthState);