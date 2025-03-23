import axios from "axios";

const API_KEY = "49370704-d81e0444584e98db4282554e4";
const BASE_URL = "https://pixabay.com/api/";

export const fetchData = async (query, page, perPage) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
                page: page,
                per_page: perPage,
            },
        });
        return response.data
    } catch (error) {      
        console.error("Error while fetching images:", error);
        throw new Error("Something went wrong. Please try again later."); // Генеруємо нову помилку для подальшої обробки
    }
}