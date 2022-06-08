import axios from "axios"
import {ACCESS_TOKEN_NAME, API_BASE_URL, REFRESH_TOKEN_NAME} from "../constants";
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
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };
    let response = await axios(config)
    if (response.data?.error_message !== undefined) {
        const configToken = {
            method: 'get',
            url: `${API_BASE_URL}/api/refreshtoken`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
                'Content-Type': 'application/json'
            }
        };
        const newTokens = await axios(configToken)
        localStorage.setItem(ACCESS_TOKEN_NAME, newTokens.access_token)
        localStorage.setItem(REFRESH_TOKEN_NAME, newTokens.refresh_token)
        config.headers.Authorization = `Bearer ${newTokens.access_token}`;
        response = await axios(config)
    }


    return response.data
}

export const getUser = async (username) => {
    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/users/edit/${username}`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios(config)
    return response.data
}

export const saveUserRoles = async (user) => {
    const config = {
        method: 'post',
        url: `${API_BASE_URL}/api/role/addtouser/${user.username}`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        },
        body: {
            'roles': `${user.roles}`
        }
    };
    const response = await axios(config)
    return response.data
}


