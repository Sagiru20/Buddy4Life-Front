import { AxiosInstance } from "axios";
import { CredentialResponse } from "@react-oauth/google";
import { backendClient } from "./BackendClient";
import { IUserInfo } from "../Models";

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IUser {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    _id?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface IEditUser {
    firstName: string;
    lastName: string;
    imageUrl?: string;
}

function useUserService(axiosPrivate: AxiosInstance) {
    async function loginUser(email: string, password: string) {
        try {
            const { data }: { data: IAuthResponse } = await backendClient.post<IAuthResponse>("/auth/login", {
                email,
                password,
            });
            return data;
        } catch (error) {
            console.error(`Error trying to login user with email ${email}: `, error);
        }
    }

    async function getUser(id: string = "me") {
        try {
            const { data }: { data: IUserInfo } = await axiosPrivate.get<IUserInfo>(`/user/${id}`);
            return data;
        } catch (error) {
            console.error(`Error trying to get user with id ${id}: `, error);
        }
    }

    const registerUser = (user: IUser) => {
        return new Promise<IUser>((resolve, reject) => {
            console.log("Registering user...");
            console.log(user);
            backendClient
                .post("/auth/register", user)
                .then((response) => {
                    console.log(response);
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };

    const googleSignin = (credentialResponse: CredentialResponse) => {
        return new Promise<IUser>((resolve, reject) => {
            console.log("googleSignin ...");
            backendClient
                .post("/auth/google", credentialResponse)
                .then((response) => {
                    console.log(response);
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };

    const updateUser = (userID: string, newUserInfo: IEditUser) => {
        return new Promise<void>((resolve, reject) => {
            axiosPrivate
                .put(`/user/${userID}`, newUserInfo)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };

    return { loginUser, getUser, registerUser, googleSignin, updateUser };
}

export default useUserService;
