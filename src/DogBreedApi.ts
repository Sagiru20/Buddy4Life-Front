import axios, { AxiosRequestConfig } from "axios";
import { IBreed } from "./Models";

const backendConfig: AxiosRequestConfig = {
    baseURL: "https://dogbreeddb.p.rapidapi.com/",
    headers: {
        "X-RapidAPI-Key": "8739f070b1msh521b2189c8925c2p18869ajsn67c9be5b6e3f",
        "X-RapidAPI-Host": "dogbreeddb.p.rapidapi.com",
    },
};

export async function getBreeds() {
    try {
        const { data } = await axios.get<IBreed[]>("/", backendConfig);

        // Filter out duplicates based on breedName
        return data.filter((breed, index, breeds) => {
            return breeds.findIndex((b) => b.breedName === breed.breedName) === index;
        });
    } catch (error) {
        console.error("Error fetching breeds: ", error);
    }
}