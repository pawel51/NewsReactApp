import qs from "qs";
import {ACCESS_TOKEN_NAME, API_BASE_URL, REFRESH_TOKEN_NAME} from "../../constants";
import axios from "axios";

export const register = async (creds) => {


    const data = JSON.stringify(creds);
    
    const config = {
        method: 'post',
        url: `${API_BASE_URL}/api/users/save`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config)
        .then(function (response) {
            if (response.status === 200) {
                sessionStorage.setItem(ACCESS_TOKEN_NAME, response.data.access_token);
                sessionStorage.setItem(REFRESH_TOKEN_NAME, response.data.refresh_token);
                return true
            }
            return false
        })
        .catch(function (error) {
            console.log(error);
            return false
        })

}