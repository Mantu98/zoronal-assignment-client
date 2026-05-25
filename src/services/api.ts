import axios from "axios";

const api = axios.create({
    baseURL: "https://zoronal-assignment-b82m.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;