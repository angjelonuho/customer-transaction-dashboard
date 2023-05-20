import { AxiosResponse, AxiosError, AxiosStatic } from "axios"
import { ApiError } from "@/interface/api/ApiError"
import axiosInstance from "./axiosInstance"

const setupAxios = (store: any) => {

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  //TODO: Retry logic

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    async (response: AxiosResponse) => {
      return Promise.resolve(response)
    },
    (error) => {
      const errorCode = error.response?.data?.error
      if (!error.response) {
        return Promise.reject(error)
      }
      if (errorCode === ApiError.INVALID_CREDENTIALS) {
        return Promise.reject(errorCode)
      }

      if (errorCode === ApiError.UNAUTHORIZED) {
        // TODO: remove bearer token from localStorage, remove user data
        // and redirect to login page

        localStorage.removeItem("token")
        return Promise.reject(errorCode)
      }

      return Promise.reject(error)
    }
  )

}

export default setupAxios