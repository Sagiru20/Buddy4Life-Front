import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Gender, IDogInfo, IPost, IPostCreationData } from "../Models";
import { ICommentResponse, convertComment } from "./comments-service";

interface GetPostsQueryParams {
    ownerId?: string | null;
    gender: Gender | null;
    breed: string | null;
    city: string | null;
}

interface IPostResponse {
    _id: string;
    title: string;
    ownerId: string;
    description: string;
    dogInfo: IDogInfo;
    city?: string;
    imageUrl?: string;
    comments: ICommentResponse[];
    createdAt: string;
    updatedAt: string;
}

function usePostService(axiosPrivate: AxiosInstance) {
    async function getPosts(queryParams: GetPostsQueryParams) {
        queryParams = {
            ...queryParams,
            ...Object.fromEntries(Object.entries(queryParams).map(([key, value]) => [key, value || null])),
        };
        const requestConfig: AxiosRequestConfig = { params: queryParams };

        try {
            const { data } = await axiosPrivate.get<IPostResponse[]>("/post", requestConfig);
            return data.map((postResponse) => convertPost(postResponse));
        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
    }

    async function getPost(id: string) {
        try {
            const { data } = await axiosPrivate.get<IPostResponse>(`/post/${id}`);
            return convertPost(data);
        } catch (error) {
            console.error(`Error fetching post with id ${id}: `, error);
        }
    }

    async function deletePost(id: string) {
        try {
            await axiosPrivate.delete<IPostResponse>(`/post/${id}`);
        } catch (error) {
            console.error(`Error deleting post with id ${id}: `, error);
        }
    }

    const createPost = (post: unknown) => {
        return new Promise<void>((resolve, reject) => {
            console.log("Creating post...");
            axiosPrivate
                .post("/post", post)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    };

    async function editPost(postId: string, newPost: IPostCreationData) {
        try {
            await axiosPrivate.put<IPostResponse>(`/post/${postId}`, newPost);
        } catch (error) {
            console.error(`Error trying to edit post with id ${postId}: `, error);
        }
    }

    function convertPost(postResponse: IPostResponse) {
        const convertedPost: IPost = {
            ...postResponse,
            createdAt: new Date(postResponse.createdAt),
            updatedAt: new Date(postResponse.updatedAt),
            comments: postResponse.comments.map((commentResponse) => convertComment(commentResponse)),
        };

        return convertedPost;
    }

    return { getPosts, getPost, deletePost, createPost, editPost };
}

export default usePostService;
