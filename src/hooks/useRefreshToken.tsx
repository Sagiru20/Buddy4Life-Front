import { backendClient } from "../services/BackendClient";
import useAuth from "./useAuth";
import { IAuthResponse } from "../services/user-services";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            console.log(auth);
            const { data } = await backendClient.get<IAuthResponse>("/auth/refresh");

            if (data) {
                console.log(data);
                await setAuth((prev) => {
                    return { ...prev, accessToken: data.accessToken };
                });
                console.log(auth);
                return data.accessToken;
            }
        } catch (error) {
            console.error("Error trying to refresh token", error);
        }
    };
    return refresh;
};

export default useRefreshToken;
