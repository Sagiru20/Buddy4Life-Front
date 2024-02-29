import axios, { CanceledError } from "axios";

export { CanceledError }
const apiClient = axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
        'Accept': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
      }
});

export default apiClient;