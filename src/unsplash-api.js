import axios from "axios";

const API_KEY = "MXVxoO0Sv9p7IVbAynXhejfa-JL9Erj4B01-RBu6WPg";

const BASIC_URL = "https://api.unsplash.com/search/photos"; 

const fetchImagesByKeyword = async (query, page, per_page = 16) => {
    const response = await axios.get(BASIC_URL, {
        params: {
            client_id: API_KEY,
            orientation: "landscape",
            query,
            page,
            per_page
        }
    });
    return response.data;
};

export default fetchImagesByKeyword;
