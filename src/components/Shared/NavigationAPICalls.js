import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../../constants";
import axios from "axios";

export const getUserRoles = async () => {

    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/roles`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        }
    };

    let response = await axios.request(config)
    if (response.status === 200) {

        return response.data
    }
    return []

}