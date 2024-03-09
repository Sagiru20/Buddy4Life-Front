import { backendClient } from "../services/BackendClient";
import useAuth from "./useAuth";
import { IAuthResponse } from "../services/user-services";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const { data } = await backendClient.get<IAuthResponse>("/auth/refresh");

            if (data) {
                await setAuth((prev) => {
                    return { ...prev, accessToken: data.accessToken };
                });
                return data.accessToken;
            }
        } catch (error) {
            console.error("Error trying to refresh token", error);
        }
    };
    return refresh;
};

export default useRefreshToken;
