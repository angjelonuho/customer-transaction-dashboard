import axios from "axios"

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
}

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_DEV_API_URL_V1,
    responseType: "json",
    headers,
})


export default axiosInstance