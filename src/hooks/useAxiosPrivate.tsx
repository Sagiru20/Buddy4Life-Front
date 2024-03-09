import { useEffect } from "react";
import { BackendPrivateClient } from "../services/BackendClient";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = BackendPrivateClient.interceptors.request.use(
            (config) => {
                console.log("in request interceptors before", config.headers);
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                console.log("in request interceptors after", config.headers);
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = BackendPrivateClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return BackendPrivateClient(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            BackendPrivateClient.interceptors.request.eject(requestIntercept);
            BackendPrivateClient.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return BackendPrivateClient;
};

export default useAxiosPrivate;
