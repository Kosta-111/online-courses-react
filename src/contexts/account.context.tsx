import React, { useContext } from "react";
import { tokenService } from "../services/token.service";

export type AccountContextType = {
    email: string | null;
    clear: () => void;
    isAuth: () => boolean;
    setEmail: (email: string | null) => void;
};

export const AccountContext = React.createContext<AccountContextType | null>(null);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [email, setEmail] = React.useState<string | null>(tokenService.getPayload()?.email ?? null);
    const clear = () => setEmail(null);
    const isAuth = () => email !== null;

    return (
        <AccountContext.Provider value={{ email, setEmail, clear, isAuth }}>
            {children}
        </AccountContext.Provider>
    );
};

// Custom hook to access the context
export const useAccountContext = (): AccountContextType => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("useAccountContext must be used within an AccountProvider");
    }
    return context;
};