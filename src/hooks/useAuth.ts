import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export function useAuth() {
    const auth = useContext(AuthContext);

    if (auth === undefined) {
        throw new Error("useAuth must be used with a AuthContext");
    }

    return auth;
}
