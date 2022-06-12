import {ACCESS_TOKEN_NAME, API_BASE_URL, REFRESH_TOKEN_NAME} from "../../constants";
import axios from "axios";

export const getAllNews = async (id) => {

    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/users/${id}/announcements`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };

    let response = await axios.request(config)
    if (response.status === 200)
        return response.data
    else{
        console.log(response)
        return []
    }

}

export const getUserId = async () => {

    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/user`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };

    let response = await axios.request(config)
    if (response.status === 200) {

        return response.data
    }
    return -1

}