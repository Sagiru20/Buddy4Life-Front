import { useState, PropsWithChildren } from "react";
import { createContext } from "react";
import { ILoggedUser } from "../Models";

const AuthContext = createContext<{
    auth: ILoggedUser;
    setAuth: React.Dispatch<React.SetStateAction<ILoggedUser>>;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}>({ auth: {}, setAuth: () => {}, persist: true, setPersist: () => {} });

export function AuthProvider({ children }: PropsWithChildren) {
    const [auth, setAuth] = useState<ILoggedUser>({});
    const [persist, setPersist] = useState<boolean>(JSON.parse(localStorage.getItem("persist") || "true"));

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</AuthContext.Provider>
    );
}

export default AuthContext;
