import apiClient, { CanceledError } from "./api-client"
import { IComment } from "../Models";


export interface ICommentResponse {
    _id: string;
    authorId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}


export async function createComment(postId: string, text: string) {
    try {
        const { data }: { data: ICommentResponse } = await apiClient.post<ICommentResponse>(
            `/post/${postId}/comment`,
            { text: text },
        );

        return convertComment(data);
    } catch (error) {
        console.error(`Error trying to create comment in post with id ${postId}: `, error);
    }
}

export async function editComment(postId: string, commentId: string, text: string) {
    try {
        const { data }: { data: ICommentResponse } = await apiClient.put<ICommentResponse>(
            `/post/${postId}/comment/${commentId}`,
            { text: text }
        );

        return convertComment(data);
    } catch (error) {
        console.error(`Error trying to edit comment with id ${commentId} in post with id ${postId}: `, error);
    }
}

export async function deleteComment(postId: string, commentId: string) {
    try {
        const { data }: { data: ICommentResponse } = await apiClient.delete<ICommentResponse>(
            `/post/${postId}/comment/${commentId}`
        );

        return convertComment(data);
    } catch (error) {
        console.error(
            `Error trying to delete comment with id ${commentId} in post with id ${postId}: `,
            error
        );
    }
}

export function convertComment(commentResponse: ICommentResponse) {
    const convertedComment: IComment = {
        ...commentResponse,
        createdAt: new Date(commentResponse.createdAt),
        updatedAt: new Date(commentResponse.updatedAt),
    };
  
    return convertedComment;
  }