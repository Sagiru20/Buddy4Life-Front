import axios, { CanceledError } from "axios";

export { CanceledError };

export const backendClient = axios.create({
    baseURL: "http://localhost:9000",
});

export const BackendPrivateClient = axios.create({
    baseURL: "http://localhost:9000/",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
