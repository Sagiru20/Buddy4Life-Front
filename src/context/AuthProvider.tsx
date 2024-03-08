import { useState, PropsWithChildren } from "react";
import { createContext } from "react";
import { ILoggedUser } from "../Models";

const AuthContext = createContext<{
    auth: ILoggedUser;
    setAuth: React.Dispatch<React.SetStateAction<ILoggedUser>>;
} | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
    const [auth, setAuth] = useState<ILoggedUser>({});

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
