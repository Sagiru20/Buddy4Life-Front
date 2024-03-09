import { backendClient } from "../services/BackendClient";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await backendClient("/auth/logout");
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
