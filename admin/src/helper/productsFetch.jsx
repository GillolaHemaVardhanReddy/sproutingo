import axios from "axios";

export const fetchProductData = async () => {
    const resp = await axios.get('/product/');
    return resp.data.data;
}; 