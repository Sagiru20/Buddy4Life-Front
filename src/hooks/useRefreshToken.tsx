import useUserService from "../services/user-services";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { refreshToken } = useUserService();

    const refresh = async () => {
        const data = await refreshToken();
        if (data !== undefined) {
            setAuth((prev) => {
                console.log(JSON.stringify(prev));
                console.log(data?.accessToken);
                return { ...prev, accessToken: data?.accessToken };
            });
            return data?.accessToken;
        }
    };
    return refresh;
};

export default useRefreshToken;
