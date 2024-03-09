import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useUserService from "../services/user-services";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const { auth, setAuth, persist } = useAuth();
    const backendPrivateClient = useAxiosPrivate();
    const { getUser } = useUserService(backendPrivateClient);

    const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
                setIsUserLogged(true);
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        async function getUserDetails() {
            const userResponse = await getUser();
            if (userResponse) {
                setAuth({ ...auth, userInfo: userResponse });
            }
        }

        if (isUserLogged) getUserDetails();
    }, [isUserLogged]);

    return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
