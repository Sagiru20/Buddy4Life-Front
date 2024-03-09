import axios from "axios";
import useAuth from "./useAuth";
import { IAuthResponse } from "../services/user-services";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const { data } = await axios.get<IAuthResponse>("/auth/refresh", {
                withCredentials: true,
            });
            console.log("in refresh  ", data);

            if (data !== undefined) {
                setAuth((prev) => {
                    return { ...prev, accessToken: data?.accessToken };
                });
                return data?.accessToken;
            }
        } catch (error) {
            console.error("Error trying to refresh token", error);
        }
    };
    return refresh;
};

export default useRefreshToken;
