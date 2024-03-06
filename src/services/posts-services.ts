import apiClient, { CanceledError } from "./api-client"
import { PostData } from "../Components/Posts/AddPost"


const getDogsBreeds = () => {
    const abortController = new AbortController()
    const req = apiClient.get('***breeds****', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }

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

export default { getDogsBreeds }