import {ACCESS_TOKEN_NAME, API_BASE_URL, REFRESH_TOKEN_NAME} from "../../constants";
import axios from "axios";
import moment from "moment";


export const getAllPublicNews = async () => {

    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/announcements/public`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
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