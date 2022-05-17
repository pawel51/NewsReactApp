import axios from "axios"
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "./constants";
import qs from "qs";



export const login = async (username, password) => {
    const data = qs.stringify({
        'username': username,
        'password': password
    });
    const config = {
        method: 'post',
        url: `${API_BASE_URL}/api/login`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

    const response = await axios(config)
    return response.data
}


export const getAllUsers = async () => {
    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/users`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios(config)
    return response.data
}
