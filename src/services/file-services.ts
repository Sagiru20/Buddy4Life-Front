import { backendClient } from "./BackendClient";

interface IUpoloadResponse {
    url: string;
}

export const uploadPhoto = async (photo: File) => {
    return new Promise<string>((resolve, reject) => {
        const formData = new FormData();
        if (photo) {
            formData.append("file", photo);
            backendClient
                .post<IUpoloadResponse>("file?file=123.jpeg", formData, {
                    headers: {
                        "Content-Type": "image/jpeg",
                    },
                })
                .then((res) => {
                    resolve(res.data.url);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        }
    });
};
