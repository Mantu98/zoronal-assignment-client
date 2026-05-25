import axios from "axios";

const api = axios.create({
    baseURL: "https://github.com/Mantu98/zoronal-assignment-client.git/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;