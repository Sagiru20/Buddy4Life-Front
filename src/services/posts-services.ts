import apiClient, { CanceledError } from "./api-client"
import { Gender, IDogInfo, IPost, IPostCreationData } from "../Models";
import {ICommentResponse, convertComment} from "./comments-service"


interface GetPostsQueryParams {
  ownerId?: string | null;
  gender: Gender | null;
  breed: string | null;
  city: string | null;
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

export const createPost = (post) => {
    return new Promise<void>((resolve, reject) => {
      console.log("Creating post...");
      apiClient
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

  export async function editPost(postId: string, newPost: IPostCreationData ) {

    try {
      const { data }: { data: IPostResponse } = await apiClient.put<IPostResponse>(
          `/post/${postId}`,
          newPost
      );

  } catch (error) {
      console.error(`Error trying to edit post with id ${postId}: `, error);
  }
}

export async function getPost(id: string) {
  try {
      const { data } = await apiClient.get<IPostResponse>(`/post/${id}`);
      return convertPost(data);
  } catch (error) {
      console.error(`Error fetching post with id ${id}: `, error);
  }
}

export async function getPosts(queryParams: GetPostsQueryParams) {
  queryParams = {
      ...queryParams,
      ...Object.fromEntries(Object.entries(queryParams).map(([key, value]) => [key, value || null])),
  };

  try {
      const { data } = await apiClient.get<IPostResponse[]>("/post", {params: queryParams});
      return data;
  } catch (error) {
      console.error("Error fetching posts: ", error);
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