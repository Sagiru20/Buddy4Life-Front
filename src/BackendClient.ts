import axios, { AxiosRequestConfig } from "axios";
import { Gender, IPost } from "./Models";

const backendConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:9000/",
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQwZTFhMzZjY2EyYjk5ZGNjODY3NGUiLCJpYXQiOjE3MDk0MDMwMzksImV4cCI6MTcwOTQyMTAzOX0.nFvnj3fYUlByyJZh6-q9gn96VRs6IoVkyY7wVL3iNss`,
    },
};

interface GetPostsQueryParams {
    ownerId?: string | null;
    gender: Gender | null;
    breed: string | null;
    city: string | null;
}

export async function getPosts(queryParams: GetPostsQueryParams) {
    queryParams = {
        ...queryParams,
        ...Object.fromEntries(Object.entries(queryParams).map(([key, value]) => [key, value || null])),
    };
    const requestConfig: AxiosRequestConfig = { ...backendConfig, params: queryParams };

    try {
        const { data } = await axios.get<IPost[]>("/post", requestConfig);
        return data;
    } catch (error) {
        console.error("Error fetching posts: ", error);
    }
}

export async function getPost(id: string) {
    try {
        const { data } = await axios.get<IPost>(`/post/${id}`, backendConfig);
        return data;
    } catch (error) {
        console.error(`Error fetching post with id ${id}: `, error);
    }
}
