import axios, { AxiosInstance } from "axios";

export const backendClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:9000",
    withCredentials: true,
});

export const BackendPrivateClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:9000/",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
