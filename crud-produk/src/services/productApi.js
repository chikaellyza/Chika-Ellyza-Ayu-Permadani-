import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:3000"
});

export const getProducts = () => {
    return API.get("/products");
};

export const addProduct = (data) => {
    return API.post("/products", data);
};

export const updateProduct = (id, data) => {
    return API.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
    return API.delete(`/products/${id}`);
};

export default API;