import axios, { AxiosRequestConfig } from "axios";
import { Gender, IComment, IDogInfo, IPost } from "./Models";

const backendConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:9000/",
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQwZTFhMzZjY2EyYjk5ZGNjODY3NGUiLCJpYXQiOjE3MDk3Mjk2MTAsImV4cCI6MTcxMDkzOTIxMH0.ZrSbFyKG2mjHBA4EiO15tcC7WKPy_p1KDF16PQ0VGQ0`,
    },
};

interface GetPostsQueryParams {
    ownerId?: string | null;
    gender: Gender | null;
    breed: string | null;
    city: string | null;
}

export interface ICommentResponse {
    _id: string;
    authorId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPostResponse {
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

export async function getPosts(queryParams: GetPostsQueryParams) {
    queryParams = {
        ...queryParams,
        ...Object.fromEntries(Object.entries(queryParams).map(([key, value]) => [key, value || null])),
    };
    const requestConfig: AxiosRequestConfig = { ...backendConfig, params: queryParams };

    try {
        const { data } = await axios.get<IPostResponse[]>("/post", requestConfig);
        return data;
    } catch (error) {
        console.error("Error fetching posts: ", error);
    }
}

export async function getPost(id: string) {
    try {
        const { data } = await axios.get<IPostResponse>(`/post/${id}`, backendConfig);
        return convertPost(data);
    } catch (error) {
        console.error(`Error fetching post with id ${id}: `, error);
    }
}

export async function createComment(postId: string, text: string) {
    try {
        const { data }: { data: ICommentResponse } = await axios.post<ICommentResponse>(
            `/post/${postId}/comment`,
            { text: text },
            backendConfig
        );

        return convertComment(data);
    } catch (error) {
        console.error(`Error trying to create comment in post with id ${postId}: `, error);
    }
}

export async function editComment(postId: string, commentId: string, text: string) {
    try {
        const { data }: { data: ICommentResponse } = await axios.put<ICommentResponse>(
            `/post/${postId}/comment/${commentId}`,
            { text: text },
            backendConfig
        );

        return convertComment(data);
    } catch (error) {
        console.error(`Error trying to edit comment with id ${commentId} in post with id ${postId}: `, error);
    }
}

export async function deleteComment(postId: string, commentId: string) {
    try {
        const { data }: { data: ICommentResponse } = await axios.delete<ICommentResponse>(
            `/post/${postId}/comment/${commentId}`,
            backendConfig
        );

        return convertComment(data);
    } catch (error) {
        console.error(
            `Error trying to delete comment with id ${commentId} in post with id ${postId}: `,
            error
        );
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

function convertComment(commentResponse: ICommentResponse) {
    const convertedComment: IComment = {
        ...commentResponse,
        createdAt: new Date(commentResponse.createdAt),
        updatedAt: new Date(commentResponse.updatedAt),
    };

    return convertedComment;
}
