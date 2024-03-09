import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            console.log("aT", auth.accessToken);
            console.log("persist", persist);

            try {
                await refresh();
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

    return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
