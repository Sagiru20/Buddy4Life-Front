import { CredentialResponse } from "@react-oauth/google"
import apiClient from "./api-client"

export interface IUser {
    email: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    imageUrl?: string,
    _id?: string,
    accessToken?: string,
    refreshToken?: string
}

export const registerUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("Registering user...")
        console.log(user)
        apiClient.post("/auth/register", user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}


export const loginUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("User Login...")
        console.log(user)

        apiClient.post("/auth/login", user).then((response) => {
            console.log(response)
              // const { accessToken } = response.data["accessToken"];
              console.log("tpoken is" + JSON.stringify(response.data["accessToken"]))             
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const googleSignin = (credentialResponse: CredentialResponse) => {
  return new Promise<IUser>((resolve, reject) => {
      console.log("googleSignin ...")
      apiClient.post("/auth/google", credentialResponse).then((response) => {
          console.log(response)
          resolve(response.data)
      }).catch((error) => {
          console.log(error)
          reject(error)
      })
  })
}


export const getCurrentUserInfo = () => {
    return new Promise<IUser>((resolve, reject) => {
      apiClient
        .get(`/user/current`)
        .then((response) => {
          resolve(response.data as IUser);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


  export const updateUser = (user: IUser) => {
    return new Promise<void>((resolve, reject) => {
        console.log("id " + user._id)
      apiClient
        .put(`/user/${user._id}`, user)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
