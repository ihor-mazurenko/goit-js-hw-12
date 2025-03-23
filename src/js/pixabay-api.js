import axios from "axios";

const API_KEY = "49370704-d81e0444584e98db4282554e4";
const BASE_URL = "https://pixabay.com/api/";

export function fetchData(query) {
    return axios
        .get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
            },
        })
        .then((response) => response.data.hits)
        .catch((error) => {            
            throw error;
        });
}