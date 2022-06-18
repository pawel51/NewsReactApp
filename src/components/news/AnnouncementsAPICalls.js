import {ACCESS_TOKEN_NAME, API_BASE_URL, REFRESH_TOKEN_NAME} from "../../constants";
import axios from "axios";
import moment from "moment";

export const getAllNews = async (id) => {

    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/users/${id}/announcements`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
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

export const getAllNotPublicNews = async () => {

    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/announcements/notpublic`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
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
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };

    let response = await axios.request(config)
    if (response.status === 200) {

        return response.data
    }
    return -1

}

export const editAnnouncement = async (editItem) => {
    const config = {
        method: 'put',
        url: `${API_BASE_URL}/api/announcements/${editItem.id}`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        },
        data: editItem
    };

    let response = await axios.request(config)
    if (response.status === 200) {
        return response.data
    }
    return { }

}

export const deleteAnnouncement = async (id) => {
    const config = {
        method: 'delete',
        url: `${API_BASE_URL}/api/announcements/${id}`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };

    await axios.request(config)

}

export const addAnnouncement = async (newItem) => {


    let myLovelyDate = moment(new Date(newItem.expirationDate)).format('YYYY-MM-DDThh:mm:ss')

    newItem.expirationDate = myLovelyDate

    myLovelyDate = moment(new Date()).format('YYYY-MM-DDThh:mm:ss')

    newItem.creationDate = myLovelyDate

    let dataStr = JSON.stringify(newItem)

    const config = {
        method: 'post',
        url: `${API_BASE_URL}/api/announcements`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        },
        data: dataStr
    };

    let response = await axios.request(config)
        .catch(err => {
            console.log(err)
        })

    if (response.status === 200) {
        return response.data
    }
    return { }

}



export const getAllStatuses = async () => {

    const config = {
        method: 'get',
        url: `${API_BASE_URL}/api/announcements/states`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN_NAME)}`,
            'Content-Type': 'application/json'
        }
    };

    let response = await axios.request(config)
        .catch(err => {
            console.log(err)
        })

    if (response.status === 200) {
        return response.data
    }
    return []

}