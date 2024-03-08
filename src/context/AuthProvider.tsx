import { useState, PropsWithChildren } from "react";
import { createContext } from "react";
import { ILoggedUser } from "../Models";

const AuthContext = createContext<{
    auth: ILoggedUser | undefined;
    setAuth: React.Dispatch<React.SetStateAction<ILoggedUser | undefined>>;
}>({ auth: undefined, setAuth: () => {} });

export function AuthProvider({ children }: PropsWithChildren) {
    const [auth, setAuth] = useState<ILoggedUser | undefined>();

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
