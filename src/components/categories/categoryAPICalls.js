import axios from "axios"
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../../constants";
import qs from "qs";

export const getAllCategories = async () => {
    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/categories`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios(config)
    if (response.status === 200)
        return response.data
    else
        return []
}

export const addCategory = async (name) => {
    const config = {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.post(`${API_BASE_URL}/api/categories`,{
        name: name
    },config);
    return response;

}

export const deleteCategory = async (id) => {
    const config = {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };
    const url = API_BASE_URL + '/api/categories/' + id;
    const response = await axios.delete(url,config);
    return response;
}

export const editCategory = async (id, name) => {
    const config = {
        method: 'put',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };
    const url = API_BASE_URL + '/api/categories/' + id;
    const response = await axios.put(url, {
        id: id,
        name: name
    }, config);
    return response;
}